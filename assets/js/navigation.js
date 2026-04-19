const trips = [
  {
    id: "bensersiel",
    name: "Nordsee",
    route: "from Bad Zwischenhahn to Bensersiel",
    story_intro: "Least planned trip due to abundance of bikepaths in Niedersachsen. Goal was to touch the Wattenmeer. In the middle of the trip, I had to get a small lift by bus, to spend more time by the coast, than along the roads.",
    map: "../assets/maps/bensersiel.png",
    gallery: [
      {
        src: "../assets/images/bensersiel/able/20260214_035332.jpg",
        caption: "Unforgettable sound of ICE1 engine launch at 4am, Ostbahnhof. Whizz and cars smoothly light up.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_085600.jpg",
        caption: "The proportions of this house tells immediately where you are. ",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_153805.jpg",
        caption: "Ankle deep peeling.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_154044.jpg",
        caption: "On zoom in, the Frisian Islands can be seen on the horizon.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_164107.jpg",
        caption: "Casual sunset in 1 of 500 Frisian towns/villages. Cosiness - but also depopulation.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_165647.jpg",
        caption: "Zielbahnhof",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_172639.jpg",
        caption: "First sunny day of 2026, genossen until the last drop.",
      },
      {
        src: "../assets/images/bensersiel/able/20260214_182439.jpg",
        caption: "June kind of light in mid-February.",
      },
    ],
  },
  {
    id: "boltenhagen",
    name: "Ostsee",
    route: "from Schwerin to Boltenhagen",
    story_intro: "80km haul from Schwerin to Boltenhagen - one of few german baltic surf spots. You can't make long stops when light fog and 3C persists. Nevertheless, sense of reward is strong - and the town was surprisingly not asleep! That is my hack - having a precious endgoal (here: seeing the Baltic). This is the fuel on random 30th kilometer when you start to question things.",
    map: "../assets/maps/boltenhagen.png",
    gallery: [
      {
        src: "../assets/images/boltenhagen/able/20250118_093845.jpg",
        caption: "Combatting black-ice with rollerskates",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_114016.jpg",
        caption: "Brick architecture ensemble; always pleasing to witness valuable heritage outside of the city.",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_135411.jpg",
        caption: "Nothing beats the late winter water optic quality",
      },
      {
        src: "../assets/images/boltenhagen/able/20250118_135536.jpg",
        caption: "Klassiker.",
      },
    ],
  },
  {
    id: "oderbruch",
    name: "Oderbruchbahn",
    route: "from Wriezen to Letschin",
    story_intro: "Just find the website of dr Achim Bartoschek, it is the most methodic listing of bike- and skatepaths I've ever seen. That former-railway route is extremely well reachable from Berlin and it's great to do it in few stages. Sheer length of uninterrupted ride is a powerful detachment from the everyday.",
    map: "../assets/maps/oderbruch.png",
    mapCredit: {
      label: "Map credit: bahnstrecken.de",
      href: "https://www.bahnstrecken.de/"
    },
    gallery: [
      {
        src: "../assets/images/oderbruch/able/20250209_085846.jpg",
        caption: "That's a long stretch altogether, done it in 3 stages.",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_085901.png",
        caption: "V-123",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_114548.jpg",
        caption: "Mild fatigue + isolation in remoteness. Feels like fjord.",
      },
      {
        src: "../assets/images/oderbruch/able/20250209_114750.jpg",
        caption: "Muhlensee. Memorable.",
      },
    ],
  },
  {
    id: "partwitzer",
    name: "Partwitzer See",
    route: "From Senftenberg to Spremberg",
    story_intro: "Was always intrigued by Neu-Seen-Land, how can man fabricate a legit sailing chain of reservoirs. Excellent quality of bikepaths, as everything here is relatively new. Coming back in summer to see if it ever gets crowded. On of along-route goals was Partwitzer See, indeed a local jewel, and partly available for swimming. 4C water is a solid refreshment, so is sunny beach mid-March. Despite those advantages, demography of the region steadily disappoints.",
    map: "../assets/maps/partwitzer.png",
    gallery: [
      {
        src: "../assets/images/partwitzer/able/20260307_055758.jpg",
        caption: "Most of those sunsets are unfortunately overslept.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_083159.jpg",
        caption: "Solidaritat Zuschlag results.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_090254.jpg",
        caption: "The spectre of industrial past.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_113501.jpg",
        caption: "Deutsche Bahn was damn right about the german Karibik.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_121621.jpg",
        caption: "Let the forest grow and no one will tell it's all man-made",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_122004.jpg",
        caption: "Resting in the shadow of the windmill.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_123751.jpg",
        caption: "Lake in the making.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_124510.jpg",
        caption: "Feels like a red carpet. Neat there.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_131804.jpg",
        caption: "Infrastructure has been ready for years.",
      },
      {
        src: "../assets/images/partwitzer/able/20260307_155711.jpg",
        caption: "Kottbus: a pleasant wait for the train.",
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
  hintBarLeftCropTimer: null,
  hintBarLeftCropActive: false,
  swipeBarNudgeDelayTimer: null,
  swipeBarNudgeTimer: null,
  textLabelSpinDelayTimer: null,
  textLabelSpinTimer: null,
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
const STORY_PREVIEW_MAX_LENGTH = 200;
const TRIPS_HINT_LEFT_CROP_DELAY_MS = 170;
const TRIPS_HINT_HIDE_DELAY_MS = 540;

const rail = document.getElementById("rail");
const tripList = document.getElementById("tripList");
const mapTitle = document.getElementById("mapTitle");
const mapRoute = document.getElementById("mapRoute");
const mapImage = document.getElementById("mapImage");
const mapCredit = document.getElementById("mapCredit");
const galleryScroll = document.getElementById("galleryScroll");
const galleryTitle = document.getElementById("galleryTitle");
const storyDescription = document.getElementById("storyDescription");
const hintBar = document.getElementById("hintBar");
const hintTrack = document.getElementById("hintTrack");
const hintLabels = Array.from(document.querySelectorAll(".hint-label"));
const aboutPanel = document.getElementById("aboutPanel");
const fullscreenViewer = document.getElementById("fullscreenViewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const textHintLabel = hintLabels.find((label) => label.dataset.view === "gallery");

function getViewportWidth() {
  return rail?.parentElement?.clientWidth || window.innerWidth;
}

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

function clearHintBarLeftCropTimer() {
  if (!state.hintBarLeftCropTimer) {
    return;
  }
  clearTimeout(state.hintBarLeftCropTimer);
  state.hintBarLeftCropTimer = null;
}

function showNoTripState() {
  mapImage.hidden = true;
  mapImage.src = "";
  mapImage.alt = "";
  mapImage.classList.remove("is-revealing");
  if (mapCredit) {
    mapCredit.textContent = "";
  }

  galleryScroll.innerHTML = "";
}

function setAboutPanelOpen(isOpen, hintFadeContext = null) {
  state.aboutOpen = isOpen;
  state.hintFadeContext = hintFadeContext;
  if (isOpen) {
    clearHintFadeTimer();
    clearHintBarHideTimer();
    clearHintBarLeftCropTimer();
    state.hintBarLeftCropActive = false;
    state.hintBarCanHide = true;
  } else if (hintFadeContext === "about" && state.viewIndex === 0) {
    // Keep the hint bar visible for one tick so the active label can switch
    // from "about" to "all trips" before the fade-out begins.
    clearHintBarHideTimer();
    clearHintBarLeftCropTimer();
    state.hintBarLeftCropActive = false;
    state.hintBarCanHide = false;
  }
  aboutPanel?.classList.toggle("is-visible", isOpen);
  updateHint(true);

  if (!isOpen && hintFadeContext === "about" && state.viewIndex === 0) {
    state.hintBarHideTimer = window.setTimeout(() => {
      state.hintBarCanHide = true;
      state.hintBarHideTimer = null;
      updateHint();
    }, 540);
  }
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

function getStoryPreview(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const wordBoundary = text.lastIndexOf(" ", maxLength);
  if (wordBoundary > Math.floor(maxLength * 0.6)) {
    return text.slice(0, wordBoundary).trimEnd();
  }
  return text.slice(0, maxLength).trimEnd();
}

function setStoryDescription(text) {
  if (!storyDescription) {
    return;
  }

  const fullText = (text || "").trim();
  storyDescription.innerHTML = "";

  if (!fullText) {
    return;
  }

  if (fullText.length <= STORY_PREVIEW_MAX_LENGTH) {
    storyDescription.textContent = fullText;
    return;
  }

  const previewText = getStoryPreview(fullText, STORY_PREVIEW_MAX_LENGTH);
  const previewSpan = document.createElement("span");
  previewSpan.textContent = `${previewText}...`;

  const readMoreButton = document.createElement("button");
  readMoreButton.type = "button";
  readMoreButton.className = "story-description-more";
  readMoreButton.textContent = "read more";
  readMoreButton.setAttribute("aria-label", "Show full story description");
  readMoreButton.addEventListener("click", () => {
    storyDescription.textContent = fullText;
  });

  storyDescription.append(previewSpan, readMoreButton);
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
  mapRoute.textContent = `${trip.route}`;
  if (trip.map) {
    mapImage.src = trip.map;
    mapImage.alt = `${trip.name} map`;
    mapImage.hidden = false;
    mapImage.classList.remove("is-revealing");
    void mapImage.offsetWidth; // force reflow to restart animation
    mapImage.classList.add("is-revealing");
    if (mapCredit) {
      if (trip.mapCredit?.href) {
        mapCredit.innerHTML = `<a href="${trip.mapCredit.href}" target="_blank" rel="noreferrer">${trip.mapCredit.label}</a>`;
      } else {
        mapCredit.textContent = trip.mapCredit?.label || "";
      }
    }
  } else {
    mapImage.src = "";
    mapImage.alt = "";
    mapImage.hidden = true;
    mapImage.classList.remove("is-revealing");
    if (mapCredit) {
      mapCredit.textContent = "";
    }
  }
  galleryTitle.textContent = `${trip.name}`;
  setStoryDescription(trip.story_intro || "");
  state.galleryRevealDone = false;

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
  items.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    figure.innerHTML = `
            <div class="gallery-photo"><img src="${item.src}" alt="${item.caption}" /></div>
            <figcaption class="gallery-caption">${item.caption}</figcaption>
        `;
    const image = figure.querySelector("img");
    if (image) {
      if (index < 2) {
        image.classList.add("is-prereveal");
      }
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
    state.hintBarLeftCropActive = false;
    clearHintBarLeftCropTimer();
    clearHintBarHideTimer();
    state.hintBarLeftCropTimer = window.setTimeout(() => {
      state.hintBarLeftCropTimer = null;
      if (state.viewIndex !== 0 || state.aboutOpen) {
        return;
      }
      state.hintBarLeftCropActive = true;
      updateHint();
    }, TRIPS_HINT_LEFT_CROP_DELAY_MS);
    state.hintBarHideTimer = window.setTimeout(() => {
      state.hintBarCanHide = true;
      state.hintBarHideTimer = null;
      updateHint();
    }, TRIPS_HINT_HIDE_DELAY_MS);
  } else if (clamped !== 0) {
    state.hintBarCanHide = true;
    state.hintBarLeftCropActive = false;
    clearHintBarLeftCropTimer();
    clearHintBarHideTimer();
  }

  rail.style.transition = animate
    ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";
  rail.style.transform = `translateX(${-clamped * getViewportWidth()}px)`;
  updateHint(animate);

  if (clamped === 2 && !state.galleryRevealDone) {
    state.galleryRevealDone = true;
    const imgs = galleryScroll.querySelectorAll("img");
    [imgs[0], imgs[1]].forEach(img => {
      if (!img) return;
      img.classList.add("is-prereveal");
      img.classList.remove("is-revealing");
      void img.offsetWidth;
      img.classList.remove("is-prereveal");
      img.classList.add("is-revealing");
    });
  }
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
  const wasHidden = hintBar?.classList.contains("is-hidden");

  // When revealing from hidden, disable all transitions except opacity+translate
  // so width/transform changes settle instantly and only the slide-up animates.
  if (wasHidden && !isHidingOnTrips && hintBar) {
    hintBar.style.transition = "opacity 0.35s ease, translate 0.35s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hintBar.style.transition = "";
      });
    });
  }

  hintBar?.classList.toggle("is-hidden", isHidingOnTrips);
  hintBar?.classList.toggle("is-story-cropped", currentView === "gallery");
  hintBar?.classList.toggle("is-about-narrow", state.aboutOpen || state.hintFadeContext === "about");
  hintBar?.classList.toggle(
    "is-trips-left-cropped",
    currentView === "trips" && state.hintFadeContext === "trip" && state.hintBarLeftCropActive,
  );

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
      state.hintBarLeftCropActive = false;
      state.hintFadeTimer = null;
      updateHint();
    }, 360);
  }

  if (currentView === "gallery" && previousHintView !== "gallery") {
    spinTextHintLabel();
  } else if (currentView !== "gallery" && textHintLabel) {
    clearTextLabelSpinTimer();
    textHintLabel.classList.remove("is-spinning");
  }
  state.lastHintView = currentView;

  if (!activeLabel) {
    return;
  }

  const skipTrackAnim = wasHidden && !isHidingOnTrips;
  setHintTrackOffset(getHintOffsetForView(activeLabel.dataset.view), animate && !skipTrackAnim);
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
  state.touchStartOffset = -state.viewIndex * getViewportWidth();
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
  const viewportWidth = getViewportWidth();
  const maxOffset = 0;
  const minOffset = -(viewOrder.length - 1) * viewportWidth;
  let nextOffset = state.touchStartOffset + deltaX;
  nextOffset = Math.max(minOffset - 120, Math.min(maxOffset + 120, nextOffset));
  rail.style.transform = `translateX(${nextOffset}px)`;

  const progress = Math.max(0, Math.min(viewOrder.length - 1, -nextOffset / viewportWidth));
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
  const threshold = getViewportWidth() * 0.18;
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
    setAboutPanelOpen(false, "about");
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
