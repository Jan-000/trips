const trips = [
  {
    id: "bensersiel",
    name: "Nordsee",
    route: "from Bad Zwischenhahn to Bensersiel",
    map: "../assets/maps/bensersiel.png",
    gallery: [
      {
        src: "../assets/images/bensersiel/able/20260214_035332.jpg",
        caption: "Salt air, long rides, and the horizon never stops.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_085600.jpg",
        caption: "Coastal paths and endless views.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_153805.jpg",
        caption: "Where the land meets the sea.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_154044.jpg",
        caption: "Final stop before the North Sea.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_164107.jpg",
        caption: "Journey through the northern coast.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_165647.jpg",
        caption: "Quiet moments at the edge of the sea.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_172639.jpg",
        caption: "Sunset on the salt marshes.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_182439.jpg",
        caption: "Last light before dusk.",
      },
    ],
  },
  {
    id: "boltenhagen",
    name: "Ostsee",
    route: "from Schwerin to Boltenhagen",
    map: "../assets/maps/boltenhagen.png",
    gallery: [
      {
        src: "../assets/images/boltenhagen/able/20250118_093845.jpg",
        caption: "Low light, cold water, and quiet roads.",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_114016.jpg",
        caption: "Baltic coastline in the distance.",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_135411.jpg",
        caption: "Frozen shores and winter light.",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_135536.jpg",
        caption: "Journey along the Baltic.",
      },
    ],
  },
  {
    id: "oderbruch",
    name: "Oderbruchbahn",
    route: "from Wriezen to Letschin",
    map: "../assets/maps/oderbruch.png",
    gallery: [
      {
        src: "../assets/images/oderbruch/able/20250209_085846.jpg",
        caption: "Historic railway through the marshlands.",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_085901.png",
        caption: "Rolling countryside and forgotten tracks.",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_114548.jpg",
        caption: "Where time moves slowly.",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_114750.jpg",
        caption: "Journey through the Oderbruch.",
      },
    ],
  },
  {
    id: "partwitzer",
    name: "Partwitzer See",
    route: "around the lake",
    map: "",
    gallery: [
      {
        src: "../assets/images/partwitzer/able/20260307_055758.jpg",
        caption: "Early morning light over the lake.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_083159.jpg",
        caption: "Mirror-still waters at dawn.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_090254.jpg",
        caption: "Quiet paths around Partwitzer See.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_113501.jpg",
        caption: "Midday reflections on the lake.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_121621.jpg",
        caption: "Lakeside vegetation and calm water.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_122004.jpg",
        caption: "Hidden corners of the lake.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_123751.jpg",
        caption: "Sunlight dancing on the surface.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_124510.jpg",
        caption: "The lake's peaceful shores.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_131804.jpg",
        caption: "Afternoon ride around the water.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_155711.jpg",
        caption: "Partwitzer See—a moment of stillness.",
      },
    ],
  },
];

const state = {
  viewIndex: 0,
  activeTrip: null,
  lastTripId: null,
  lastNonTripsIndex: null,
  aboutOpen: false,
  hintFadeContext: null,
  hintFadeTimer: null,
  hintBarCanHide: true,
  hintBarHideTimer: null,
  swipeBarNudgeDelayTimer: null,
  swipeBarNudgeTimer: null,
  textLabelSpinDelayTimer: null,
  textLabelSpinTimer: null,
  storyArrowDelayTimer: null,
  lastHintView: null,
  touchActive: false,
  touchStartX: 0,
  touchStartY: 0,
  touchStartOffset: 0,
  touchLock: null,
  fullscreenIndex: -1,
  fullscreenTouchStartX: 0,
  fullscreenTouchStartY: 0,
  suppressFullscreenClickClose: false,
};

const STORY_LABEL_SPIN_DELAY_MS = 500;
const STORY_LABEL_SPIN_DURATION_MS = 1500;
const STORY_ARROW_DELAY_AFTER_SPIN_MS = 1000;

const rail = document.getElementById("rail");
const tripList = document.getElementById("tripList");
const mapTitle = document.getElementById("mapTitle");
const mapRoute = document.getElementById("mapRoute");
const mapImage = document.getElementById("mapImage");
const galleryScroll = document.getElementById("galleryScroll");
const galleryTitle = document.getElementById("galleryTitle");
const galleryRoute = document.getElementById("galleryRoute");
const hintBar = document.getElementById("hintBar");
const hintTrack = document.getElementById("hintTrack");
const hintLabels = Array.from(document.querySelectorAll(".hint-label"));
const aboutPanel = document.getElementById("aboutPanel");
const fullscreenViewer = document.getElementById("fullscreenViewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const textHintLabel = hintLabels.find((label) => label.dataset.view === "gallery");

function openFullscreenImage(src, alt = "") {
  if (!fullscreenViewer || !fullscreenImage || !src) return;
  fullscreenImage.src = src;
  fullscreenImage.alt = alt;
  fullscreenViewer.classList.add("is-visible");
  fullscreenViewer.setAttribute("aria-hidden", "false");
}

function closeFullscreenImage() {
  if (!fullscreenViewer || !fullscreenImage) return;
  fullscreenViewer.classList.remove("is-visible");
  fullscreenViewer.setAttribute("aria-hidden", "true");
  fullscreenImage.src = "";
  fullscreenImage.alt = "";
  state.fullscreenIndex = -1;
}

function isFullscreenOpen() {
  return Boolean(fullscreenViewer?.classList.contains("is-visible"));
}

function showFullscreenByIndex(index) {
  if (!state.activeTrip?.gallery?.length) return;
  const clampedIndex = Math.max(
    0,
    Math.min(state.activeTrip.gallery.length - 1, index),
  );
  const item = state.activeTrip.gallery[clampedIndex];
  if (!item) return;
  state.fullscreenIndex = clampedIndex;
  openFullscreenImage(item.src, item.caption || "");
}

function stepFullscreen(delta) {
  if (!isFullscreenOpen() || !state.activeTrip?.gallery?.length) return;
  const nextIndex = state.fullscreenIndex + delta;
  if (nextIndex < 0 || nextIndex >= state.activeTrip.gallery.length) return;
  showFullscreenByIndex(nextIndex);
}

const viewOrder = ["trips", "map", "gallery"];

function clearHintFadeTimer() {
  if (!state.hintFadeTimer) {
    return;
  }
  clearTimeout(state.hintFadeTimer);
  state.hintFadeTimer = null;
}

function clearHintBarHideTimer() {
  if (!state.hintBarHideTimer) {
    return;
  }
  clearTimeout(state.hintBarHideTimer);
  state.hintBarHideTimer = null;
}

function showNoTripState() {
  mapTitle.textContent = "Pick a trip";
  mapRoute.textContent = "Swipe left when ready";
  mapImage.hidden = true;
  mapImage.src = "";
  mapImage.alt = "";
  galleryTitle.textContent = "Story";
  galleryRoute.textContent = "Swipe right for the map";
  galleryScroll.innerHTML = "";
}

function setAboutPanelOpen(isOpen, hintFadeContext = null) {
  state.aboutOpen = isOpen;
  state.hintFadeContext = hintFadeContext;
  if (isOpen) {
    clearHintFadeTimer();
    clearHintBarHideTimer();
    state.hintBarCanHide = true;
  }
  aboutPanel?.classList.toggle("is-visible", isOpen);
  updateHint(true);
}

function renderTrips() {
  tripList.innerHTML = "";
  trips.forEach((trip) => {
    const card = document.createElement("li");
    card.className = "trip-card";
    card.innerHTML = `
            <div class="trip-name">${trip.name}</div>
            <div class="trip-route">${trip.route}</div>
        `;
    card.addEventListener("click", () => {
      setActiveTrip(trip.id);
      setView(1, true);
    });
    tripList.appendChild(card);
  });
}

function setActiveTrip(tripId) {
  const trip = trips.find((item) => item.id === tripId) || null;
  state.activeTrip = trip;
  if (trip) {
    state.lastTripId = trip.id;
  }

  if (!trip) {
    showNoTripState();
    return;
  }

  mapTitle.textContent = trip.name;
  mapRoute.textContent = `${trip.route} - swipe left for text`;
  if (trip.map) {
    mapImage.src = trip.map;
    mapImage.alt = `${trip.name} map`;
    mapImage.hidden = false;
  } else {
    mapImage.src = "";
    mapImage.alt = "";
    mapImage.hidden = true;
    mapRoute.textContent = `${trip.route} - map coming soon`;
  }
  galleryTitle.textContent = `${trip.name} text`;
  galleryRoute.textContent = "Swipe right for the map";
  renderGallery(trip.gallery);
}

function renderGallery(items) {
  galleryScroll.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Photos coming soon.";
    galleryScroll.appendChild(empty);
    return;
  }
  items.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    figure.innerHTML = `
            <div class="gallery-photo"><img src="${item.src}" alt="${item.caption}" /></div>
            <figcaption class="gallery-caption">${item.caption}</figcaption>
        `;
    const image = figure.querySelector("img");
    if (image) {
      image.dataset.index = String(galleryScroll.children.length);
    }
    galleryScroll.appendChild(figure);
  });
  galleryScroll.scrollTop = 0;
}

function setView(index, animate) {
  const previousIndex = state.viewIndex;
  const clamped = Math.max(0, Math.min(viewOrder.length - 1, index));
  state.viewIndex = clamped;
  if (clamped === 1 || clamped === 2) {
    state.lastNonTripsIndex = clamped;
    state.hintFadeContext = null;
    clearHintFadeTimer();
  }

  if (clamped === 1 && previousIndex !== 1) {
    triggerSwipeBarNudge();
  }

  if (clamped !== 1) {
    clearSwipeBarNudgeTimers();
    hintTrack?.classList.remove("is-swipe-nudging");
  }

  if (clamped === 0 && previousIndex !== 0 && !state.aboutOpen) {
    state.hintFadeContext = "trip";
    state.hintBarCanHide = false;
    clearHintBarHideTimer();
    state.hintBarHideTimer = window.setTimeout(() => {
      state.hintBarCanHide = true;
      state.hintBarHideTimer = null;
      updateHint();
    }, 540);
  } else if (clamped !== 0) {
    state.hintBarCanHide = true;
    clearHintBarHideTimer();
  }

  rail.style.transition = animate
    ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";
  rail.style.transform = `translateX(${-clamped * 100}vw)`;
  updateHint(animate);
}

function updateHintTrackInsets() {
  const visibleLabels = hintLabels.filter(
    (label) => !label.classList.contains("is-hidden"),
  );
  const activeVisibleLabel = visibleLabels.find((label) =>
    label.classList.contains("active"),
  );

  hintLabels.forEach((label) => {
    label.classList.remove("edge-left", "edge-right");
  });

  if (visibleLabels.length > 1) {
    visibleLabels[0].classList.add("edge-left");
    visibleLabels[visibleLabels.length - 1].classList.add("edge-right");
  }

  if (activeVisibleLabel) {
    activeVisibleLabel.classList.remove("edge-left", "edge-right");
  }

  if (!hintBar || !hintTrack || !visibleLabels.length) {
    return false;
  }

  const firstLabel = visibleLabels[0];
  const lastLabel = visibleLabels[visibleLabels.length - 1];
  const halfBarWidth = hintBar.clientWidth / 2;
  const leftInset = Math.max(0, halfBarWidth - firstLabel.offsetWidth / 2);
  const rightInset = Math.max(0, halfBarWidth - lastLabel.offsetWidth / 2);
  hintTrack.style.paddingLeft = `${leftInset}px`;
  hintTrack.style.paddingRight = `${rightInset}px`;
  return true;
}

function getHintOffsetForView(view) {
  if (!updateHintTrackInsets()) {
    return null;
  }

  const label = hintLabels.find(
    (item) => item.dataset.view === view && !item.classList.contains("is-hidden"),
  );
  if (!label || !hintBar) {
    return null;
  }

  return hintBar.clientWidth / 2 - (label.offsetLeft + label.offsetWidth / 2);
}

function setHintTrackOffset(offset, animate = true) {
  if (!hintTrack || offset === null) {
    return;
  }

  if (!animate) {
    hintTrack.style.transition = "none";
  }
  hintTrack.style.transform = `translateX(${offset}px)`;
  if (!animate) {
    hintTrack.offsetWidth;
    hintTrack.style.transition = "";
  }
}

function updateHint(animate = true) {
  const currentView = state.aboutOpen ? "about" : viewOrder[state.viewIndex];
  const previousHintView = state.lastHintView;
  let activeLabel = null;

  hintLabels.forEach((label) => {
    const isActive = label.dataset.view === currentView;
    label.classList.toggle("active", isActive);
    if (isActive) {
      activeLabel = label;
    }
  });

  const isHidingOnTrips =
    state.viewIndex === 0 && !state.aboutOpen && state.hintBarCanHide;
  hintBar?.classList.toggle("is-hidden", isHidingOnTrips);

  const showAboutOnly = state.aboutOpen;
  const showAboutFadeSet =
    !state.aboutOpen && state.hintFadeContext === "about";
  const showTripFadeSet = !state.aboutOpen && state.hintFadeContext === "trip";
  const isTripsView = state.viewIndex === 0;
  hintLabels.forEach((label) => {
    const isAbout = label.dataset.view === "about";
    const isTrips = label.dataset.view === "trips";
    const isMap = label.dataset.view === "map";
    const isText = label.dataset.view === "gallery";
    const shouldHide = showAboutOnly
      ? !(isAbout || isTrips)
      : showAboutFadeSet
        ? !(isAbout || isTrips)
        : showTripFadeSet
          ? !(isTrips || isMap || isText)
          : isTripsView
            ? !isTrips
            : isAbout;
    label.classList.toggle("is-hidden", shouldHide);
  });

  const contextualVisible = hintLabels.filter(
    (label) => !label.classList.contains("is-hidden"),
  );
  if (contextualVisible.length > 3) {
    const activeIndex = contextualVisible.findIndex(
      (label) => label.dataset.view === currentView,
    );
    if (activeIndex !== -1) {
      let start = Math.max(0, activeIndex - 1);
      let end = Math.min(contextualVisible.length - 1, activeIndex + 1);

      if (end - start < 2) {
        if (start === 0) {
          end = Math.min(contextualVisible.length - 1, 2);
        } else if (end === contextualVisible.length - 1) {
          start = Math.max(0, contextualVisible.length - 3);
        }
      }

      contextualVisible.forEach((label, index) => {
        const inWindow = index >= start && index <= end;
        label.classList.toggle("is-hidden", !inWindow);
      });
    }
  }

  if (isHidingOnTrips && state.hintFadeContext && !state.hintFadeTimer) {
    state.hintFadeTimer = window.setTimeout(() => {
      state.hintFadeContext = null;
      state.hintFadeTimer = null;
      updateHint();
    }, 360);
  }

  if (currentView === "gallery" && previousHintView !== "gallery") {
    spinTextHintLabel();
    triggerStoryArrowNudge();
  } else if (currentView !== "gallery" && textHintLabel) {
    clearTextLabelSpinTimer();
    clearStoryArrowTimers();
    textHintLabel.classList.remove("is-spinning");
  }
  state.lastHintView = currentView;

  if (!activeLabel) {
    return;
  }

  setHintTrackOffset(getHintOffsetForView(activeLabel.dataset.view), animate);
}

function clearSwipeBarNudgeTimers() {
  if (state.swipeBarNudgeDelayTimer) {
    clearTimeout(state.swipeBarNudgeDelayTimer);
    state.swipeBarNudgeDelayTimer = null;
  }
  if (!state.swipeBarNudgeTimer) return;
  clearTimeout(state.swipeBarNudgeTimer);
  state.swipeBarNudgeTimer = null;
}

function triggerSwipeBarNudge() {
  if (!hintTrack) return;
  clearSwipeBarNudgeTimers();
  hintTrack.classList.remove("is-swipe-nudging");
  state.swipeBarNudgeDelayTimer = window.setTimeout(() => {
    state.swipeBarNudgeDelayTimer = null;
    // Force reflow to replay the keyframe sequence on repeated map entries.
    hintTrack.offsetWidth;
    hintTrack.classList.add("is-swipe-nudging");
    state.swipeBarNudgeTimer = window.setTimeout(() => {
      hintTrack.classList.remove("is-swipe-nudging");
      state.swipeBarNudgeTimer = null;
    }, 560);
  }, 800);
}

function clearTextLabelSpinTimer() {
  if (state.textLabelSpinDelayTimer) {
    clearTimeout(state.textLabelSpinDelayTimer);
    state.textLabelSpinDelayTimer = null;
  }
  if (!state.textLabelSpinTimer) return;
  clearTimeout(state.textLabelSpinTimer);
  state.textLabelSpinTimer = null;
}

function clearStoryArrowTimers() {
  if (state.storyArrowDelayTimer) {
    clearTimeout(state.storyArrowDelayTimer);
    state.storyArrowDelayTimer = null;
  }
  textHintLabel?.classList.remove("is-arrow-nudging");
}

function triggerStoryArrowNudge() {
  if (!textHintLabel) return;
  clearStoryArrowTimers();
  textHintLabel.classList.remove("is-arrow-nudging");
  const delayMs =
    STORY_LABEL_SPIN_DELAY_MS +
    STORY_LABEL_SPIN_DURATION_MS +
    STORY_ARROW_DELAY_AFTER_SPIN_MS;
  state.storyArrowDelayTimer = window.setTimeout(() => {
    state.storyArrowDelayTimer = null;
    // Force reflow so the animation can replay on repeated entries.
    textHintLabel.offsetWidth;
    textHintLabel.classList.add("is-arrow-nudging");
  }, delayMs);
}

function onStoryArrowAnimationEnd(event) {
  if (event.animationName !== "moveFade") return;
  textHintLabel?.classList.remove("is-arrow-nudging");
}

function spinTextHintLabel() {
  if (!textHintLabel) return;
  clearTextLabelSpinTimer();
  textHintLabel.classList.remove("is-spinning");
  state.textLabelSpinDelayTimer = window.setTimeout(() => {
    state.textLabelSpinDelayTimer = null;
    // Force reflow so animation restarts cleanly on repeated entries.
    textHintLabel.offsetWidth;
    textHintLabel.classList.add("is-spinning");
    state.textLabelSpinTimer = window.setTimeout(() => {
      textHintLabel.classList.remove("is-spinning");
      state.textLabelSpinTimer = null;
    }, STORY_LABEL_SPIN_DURATION_MS);
  }, STORY_LABEL_SPIN_DELAY_MS);
}

function onTouchStart(event) {
  const touch = event.touches[0];
  if (!touch) return;
  state.touchActive = true;
  state.touchStartX = touch.clientX;
  state.touchStartY = touch.clientY;
  state.touchStartOffset = -state.viewIndex * window.innerWidth;
  state.touchLock = null;
  rail.style.transition = "none";
}

function onTouchMove(event) {
  if (!state.touchActive) return;
  const touch = event.touches[0];
  if (!touch) return;

  const deltaX = touch.clientX - state.touchStartX;
  const deltaY = touch.clientY - state.touchStartY;

  if (!state.touchLock) {
    if (Math.abs(deltaX) > 12) {
      state.touchLock = "x";
    } else if (Math.abs(deltaY) > 12) {
      state.touchLock = "y";
    }
  }

  if (state.touchLock === "y") {
    return;
  }

  event.preventDefault();
  const maxOffset = 0;
  const minOffset = -(viewOrder.length - 1) * window.innerWidth;
  let nextOffset = state.touchStartOffset + deltaX;
  nextOffset = Math.max(minOffset - 120, Math.min(maxOffset + 120, nextOffset));
  rail.style.transform = `translateX(${nextOffset}px)`;

  const progress = Math.max(0, Math.min(viewOrder.length - 1, -nextOffset / window.innerWidth));
  const leftIndex = Math.floor(progress);
  const rightIndex = Math.ceil(progress);
  const leftOffset = getHintOffsetForView(viewOrder[leftIndex]);
  const rightOffset = getHintOffsetForView(viewOrder[rightIndex]);
  if (leftOffset === null || rightOffset === null) {
    return;
  }

  const interpolation = progress - leftIndex;
  const selectorOffset = leftOffset + (rightOffset - leftOffset) * interpolation;
  setHintTrackOffset(selectorOffset, false);
}

function onTouchEnd(event) {
  if (!state.touchActive) return;
  state.touchActive = false;

  if (state.touchLock === "y") {
    setView(state.viewIndex, true);
    return;
  }

  const touch = event.changedTouches[0];
  if (!touch) {
    setView(state.viewIndex, true);
    return;
  }

  const deltaX = touch.clientX - state.touchStartX;
  const threshold = window.innerWidth * 0.18;
  let nextIndex = state.viewIndex;

  if (Math.abs(deltaX) > threshold) {
    if (deltaX < 0) {
      if (state.viewIndex === 0) {
        if (state.lastNonTripsIndex !== null) {
          nextIndex = state.lastNonTripsIndex;
        }
      } else {
        nextIndex = state.viewIndex + 1;
      }
    } else {
      nextIndex = state.viewIndex <= 1 ? 0 : state.viewIndex - 1;
    }
  }

  setView(nextIndex, true);
}

function onTouchCancel() {
  if (!state.touchActive) return;
  state.touchActive = false;
  setView(state.viewIndex, true);
}

function onKeyDown(event) {
  if (isFullscreenOpen()) {
    if (event.key === "ArrowLeft") {
      stepFullscreen(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      stepFullscreen(1);
      return;
    }
  }
  if (event.key === "Escape") {
    closeFullscreenImage();
    return;
  }
  if (event.key === "ArrowLeft") {
    setView(state.viewIndex - 1, true);
  }
  if (event.key === "ArrowRight") {
    setView(state.viewIndex + 1, true);
  }
}

function onHintClick(event) {
  const target = event.target.closest(".hint-label");
  if (!target) return;
  const view = target.dataset.view;
  if (view === "about") {
    setAboutPanelOpen(true);
    return;
  }
  if (view === "trips") {
    setAboutPanelOpen(false);
    setView(0, true);
    return;
  }
  const index = viewOrder.indexOf(view);
  if (index === -1) return;
  if (state.aboutOpen) {
    setAboutPanelOpen(false);
  }
  setView(index, true);
}

function onResize() {
  setView(state.viewIndex, false);
}

function readInitialState() {
  const hash = window.location.hash.replace("#", "");
  const params = new URLSearchParams(hash);
  const tripId = params.get("trip");
  const view = params.get("view");
  const viewIndex = viewOrder.indexOf(view);
  return {
    tripId: trips.some((item) => item.id === tripId) ? tripId : null,
    viewIndex: viewIndex === -1 ? 0 : viewIndex,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  renderTrips();
  const initial = readInitialState();
  if (initial.tripId) {
    setActiveTrip(initial.tripId);
  } else {
    setActiveTrip(null);
  }
  state.lastNonTripsIndex = initial.viewIndex === 0 ? null : initial.viewIndex;
  setView(initial.viewIndex, false);

  textHintLabel?.addEventListener("animationend", onStoryArrowAnimationEnd);

  rail.addEventListener("touchstart", onTouchStart, { passive: true });
  rail.addEventListener("touchmove", onTouchMove, { passive: false });
  rail.addEventListener("touchend", onTouchEnd, { passive: true });
  rail.addEventListener("touchcancel", onTouchCancel, { passive: true });

  galleryScroll?.addEventListener("click", (event) => {
    const image = event.target.closest("img");
    if (!image || !galleryScroll.contains(image)) return;
    const index = Number.parseInt(image.dataset.index || "", 10);
    if (Number.isNaN(index)) {
      openFullscreenImage(image.currentSrc || image.src, image.alt || "");
      return;
    }
    showFullscreenByIndex(index);
  });

  fullscreenViewer?.addEventListener("click", () => {
    if (state.suppressFullscreenClickClose) {
      state.suppressFullscreenClickClose = false;
      return;
    }
    closeFullscreenImage();
  });

  fullscreenViewer?.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      state.fullscreenTouchStartX = touch.clientX;
      state.fullscreenTouchStartY = touch.clientY;
      state.suppressFullscreenClickClose = false;
    },
    { passive: true },
  );

  fullscreenViewer?.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - state.fullscreenTouchStartX;
      const deltaY = touch.clientY - state.fullscreenTouchStartY;
      const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.1;
      const threshold = 40;
      if (!mostlyHorizontal || Math.abs(deltaX) < threshold) {
        return;
      }

      state.suppressFullscreenClickClose = true;
      if (deltaX < 0) {
        stepFullscreen(1);
      } else {
        stepFullscreen(-1);
      }
    },
    { passive: true },
  );

  hintBar.addEventListener("click", onHintClick);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);

  const aboutCard = document.getElementById("aboutCard");
  const openAbout = () => setAboutPanelOpen(true);
  const closeAbout = () => setAboutPanelOpen(false, "about");

  if (aboutCard) {
    aboutCard.addEventListener("click", openAbout);
  }

  let aboutTouchStartX = 0;
  let aboutTouchStartY = 0;
  aboutPanel?.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      aboutTouchStartX = touch.clientX;
      aboutTouchStartY = touch.clientY;
    },
    { passive: true },
  );
  aboutPanel?.addEventListener(
    "touchend",
    (event) => {
      if (!state.aboutOpen) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - aboutTouchStartX;
      const deltaY = touch.clientY - aboutTouchStartY;
      const isRightSwipe = deltaX > 56;
      const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
      if (isRightSwipe && mostlyHorizontal) {
        closeAbout();
      }
    },
    { passive: true },
  );

  fullscreenViewer?.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
    },
    { passive: false },
  );
});
