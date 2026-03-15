function applyStyle(divId, style) {
  const div = document.getElementById(divId);
  div.focus();
  let command;
  switch (style) {
    case "bold":
      command = "bold";
      break;
    case "italic":
      command = "italic";
      break;
    case "underline":
      command = "underline";
      break;
  }
  if (command) {
    document.execCommand(command, false, null);
  }
}

function findEnclosingBgSpan(range) {
  const startNode =
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement
      : range.startContainer;
  let candidate = startNode.closest('span');
  while (candidate) {
    if (
      candidate.contains(range.startContainer) &&
      candidate.contains(range.endContainer) &&
      candidate.style.background === '#ffb3de'
    ) {
      return candidate;
    }
    candidate = candidate.parentElement
      ? candidate.parentElement.closest('span')
      : null;
  }
  return null;
}

function applyBgColor(divId) {
  const div = document.getElementById(divId);
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (range.collapsed) return;
  if (!div.contains(range.commonAncestorContainer)) return;

  const spanToToggle = findEnclosingBgSpan(range);
  if (spanToToggle && spanToToggle.style.background === '#ffb3de') {
    const parent = spanToToggle.parentNode;
    while (spanToToggle.firstChild) {
      parent.insertBefore(spanToToggle.firstChild, spanToToggle);
    }
    parent.removeChild(spanToToggle);
    return;
  }

  const span = document.createElement('span');
  span.style.background = '#ffb3de';
  try {
    range.surroundContents(span);
  } catch (err) {
    const fragment = range.cloneContents();
    span.appendChild(fragment);
    range.deleteContents();
    range.insertNode(span);
  }

  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(span);
  newRange.collapse(true);
  selection.addRange(newRange);
}

function tokenizeSentence(root) {
  const tokens = [];

  function walk(node, styleState) {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.trim().split(/\s+/).filter(Boolean);

      for (const word of words) {
        tokens.push({
          word,
          bold: styleState.bold,
          background: styleState.background,
        });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const nextStyle = { ...styleState };

    if (node.tagName === "B" || node.tagName === "STRONG") {
      nextStyle.bold = true;
    }

    if (node.tagName === "SPAN") {
      const bg = node.style.background || node.style.backgroundColor;
      if (bg) nextStyle.background = bg;
    }

    for (const child of node.childNodes) {
      walk(child, nextStyle);
    }
  }

  walk(root, {
    bold: false,
    background: null,
  });

  return tokens;
}

function annotateTagState(diffObjectsArray) {
  let inTag = false;
  diffObjectsArray.forEach((diffObject) => {
    diffObject.startsInsideTag = inTag;
    for (const ch of diffObject.value) {
      if (ch === '<' && !inTag) {
        inTag = true;
      } else if (ch === '>' && inTag) {
        inTag = false;
      }
    }
    diffObject.endsInsideTag = inTag;
  });
  return diffObjectsArray;
}

function hasTextOutsideTags(value, startsInsideTag) {
  let inTag = startsInsideTag;
  for (const ch of value) {
    if (ch === '<' && !inTag) {
      inTag = true;
      continue;
    }
    if (ch === '>' && inTag) {
      inTag = false;
      continue;
    }
    if (!inTag) {
      return true;
    }
  }
  return false;
}

function prepareItemsForWrapping(diffObjectsArray) {
  // First annotate tag state so we know whether each chunk starts inside a tag.
  annotateTagState(diffObjectsArray);

  return diffObjectsArray.map((diffObject) => {
    // If the chunk contains any text outside of tags, it is safe to wrap.
    diffObject.considerForWrapping = hasTextOutsideTags(
      diffObject.value,
      diffObject.startsInsideTag
    );
    return diffObject;
  });
}

function wrapTextOutsideTags(value, className, startsInsideTag) {
  let inTag = startsInsideTag;
  let buffer = "";
  let output = "";

  const flushBuffer = () => {
    if (!buffer) return;
    if (inTag) {
      output += buffer;
    } else {
      output += `<mark class='${className}'>${buffer}</mark>`;
    }
    buffer = "";
  };

  for (const ch of value) {
    if (ch === '<' && !inTag) {
      flushBuffer();
      inTag = true;
      buffer += ch;
      continue;
    }
    if (ch === '>' && inTag) {
      buffer += ch;
      flushBuffer();
      inTag = false;
      continue;
    }
    buffer += ch;
  }

  flushBuffer();
  return output;
}

function buildDiffHtml(processedArray, isDeletion) {
  let html = "";
  processedArray.forEach((part) => {
    if (isDeletion ? part.removed : part.added) {
      if (part.considerForWrapping) {
        const className = isDeletion ? 'removed' : 'added';
        html += wrapTextOutsideTags(part.value, className, part.startsInsideTag);
      } else {
        html += part.value; // Don't wrap if not safe
      }
    } else {
      html += part.value; // Common parts are always added plain
    }
  });
  return html;
}

function showDiff() {
  const aEl = document.getElementById("inputA");
  const bEl = document.getElementById("inputB");

  const tokensA = tokenizeSentence(aEl);
  const tokensB = tokenizeSentence(bEl);

  console.log("Tokens A:", tokensA);
  console.log("Tokens B:", tokensB);
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>\"']/g, (m) => map[m]);
  // Note: escapeHtml is now only used for textarea input, not for rendering output
}

function normalizeToTextNode(node, offset) {
  if (!node) return null;

  if (node.nodeType === Node.TEXT_NODE) {
    return { node, offset };
  }

  const children = node.childNodes;
  if (!children || children.length === 0) {
    return null;
  }

  let idx = Math.min(offset, children.length - 1);
  let current = children[idx];

  // Descend to a text node if possible
  while (current && current.nodeType !== Node.TEXT_NODE) {
    if (current.childNodes && current.childNodes.length > 0) {
      current = current.childNodes[0];
    } else {
      break;
    }
  }

  if (!current || current.nodeType !== Node.TEXT_NODE) {
    return null;
  }

  return { node: current, offset: Math.min(offset, current.textContent.length) };
}

function getWordBoundaries(text, index) {
  if (!text || index < 0 || index > text.length) {
    return null;
  }

  const isWhitespace = (ch) => /\s/.test(ch);

  // Prefer character to the left as the "current" one when possible
  const leftIndex = index > 0 ? index - 1 : index;
  const rightIndex = index < text.length ? index : text.length - 1;

  const leftChar = text[leftIndex];
  const rightChar = text[rightIndex];

  // If we're adjacent to or on whitespace, select the contiguous whitespace run
  if (leftChar && isWhitespace(leftChar)) {
    let start = leftIndex;
    while (start > 0 && isWhitespace(text[start - 1])) {
      start--;
    }
    let end = leftIndex + 1;
    while (end < text.length && isWhitespace(text[end])) {
      end++;
    }
    return { start, end };
  }

  if (rightChar && isWhitespace(rightChar)) {
    let start = rightIndex;
    while (start > 0 && isWhitespace(text[start - 1])) {
      start--;
    }
    let end = rightIndex + 1;
    while (end < text.length && isWhitespace(text[end])) {
      end++;
    }
    return { start, end };
  }

  // Otherwise, select the contiguous non-whitespace "word" run
  let i = index;
  if (i === text.length) {
    i = text.length - 1;
  }

  if (isWhitespace(text[i])) {
    return null;
  }

  let start = i;
  while (start > 0 && !isWhitespace(text[start - 1])) {
    start--;
  }
  let end = i + 1;
  while (end < text.length && !isWhitespace(text[end])) {
    end++;
  }

  return { start, end };
}

function enforceWordSelectionWithin(container) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  // Ensure both anchor and focus are inside the container
  const anchorNorm = normalizeToTextNode(sel.anchorNode, sel.anchorOffset);
  const focusNorm = normalizeToTextNode(sel.focusNode, sel.focusOffset);
  if (!anchorNorm || !focusNorm) return;
  if (!container.contains(anchorNorm.node) || !container.contains(focusNorm.node)) {
    return;
  }

  const anchorText = anchorNorm.node.textContent;
  const focusText = focusNorm.node.textContent;
  const anchorBounds = getWordBoundaries(anchorText, anchorNorm.offset);
  const focusBounds = getWordBoundaries(focusText, focusNorm.offset);
  if (!anchorBounds || !focusBounds) return;

  const newRange = document.createRange();
  try {
    newRange.setStart(anchorNorm.node, anchorBounds.start);
    newRange.setEnd(focusNorm.node, focusBounds.end);
  } catch (e) {
    // If direction is reversed (focus before anchor), swap them
    newRange.setStart(focusNorm.node, focusBounds.start);
    newRange.setEnd(anchorNorm.node, anchorBounds.end);
  }

  sel.removeAllRanges();
  sel.addRange(newRange);
}

["inputA", "inputB"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;

  // Mouse selection snapping (can be revisited separately)
  el.addEventListener("mouseup", () => enforceWordSelectionWithin(el));

  // Keyboard selection: only snap when using Shift + Arrow keys
  el.addEventListener("keyup", (event) => {
    const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!event.shiftKey || !arrowKeys.includes(event.key)) {
      return;
    }
    enforceWordSelectionWithin(el);
  });
});
