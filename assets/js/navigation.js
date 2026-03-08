const trips = [
  {
    id: "bensersiel",
    name: "Nordsee",
    route: "from Bad Zwischenhahn to Bensersiel",
    map: "../assets/maps/bensersiel.png",
    gallery: [
      {
        src: "../assets/images/bensersiel/bensersiel2.png",
        caption: "Salt air, long rides, and the horizon never stops.",
      },
      {
        src: "../assets/images/bensersiel/trip2.png",
        caption: "Coastal paths and endless views.",
      },
      {
        src: "../assets/images/bensersiel/trip2_2.png",
        caption: "Where the land meets the sea.",
      },
      {
        src: "../assets/images/bensersiel/trip2_2_2.png",
        caption: "Final stop before the North Sea.",
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
        src: "../assets/images/boltenhagen/boltenhagen.png",
        caption: "Low light, cold water, and quiet roads.",
      },
      {
        src: "../assets/images/boltenhagen/boltenhagen2.png",
        caption: "Baltic coastline in the distance.",
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
        src: "../assets/images/oderbruch/oderbruch.png",
        caption: "Historic railway through the marshlands.",
      },
      {
        src: "../assets/images/oderbruch/oderbruch2.png",
        caption: "Rolling countryside and forgotten tracks.",
      },
      {
        src: "../assets/images/oderbruch/oderbruch3.png",
        caption: "Where time moves slowly.",
      },
      {
        src: "../assets/images/oderbruch/trip1.png",
        caption: "Journey through the Oderbruch.",
      },
    ],
  },
  {
    id: "partwitzer",
    name: "Partwitzer See",
    route: "map and photos coming soon",
    map: "",
    gallery: [],
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
  touchActive: false,
  touchStartX: 0,
  touchStartY: 0,
  touchStartOffset: 0,
  touchLock: null,
};

const rail = document.getElementById("rail");
const tripList = document.getElementById("tripList");
const mapTitle = document.getElementById("mapTitle");
const mapRoute = document.getElementById("mapRoute");
const mapImage = document.getElementById("mapImage");
const mapEmpty = document.getElementById("mapEmpty");
const galleryScroll = document.getElementById("galleryScroll");
const galleryTitle = document.getElementById("galleryTitle");
const galleryRoute = document.getElementById("galleryRoute");
const hintBar = document.getElementById("hintBar");
const hintLabels = Array.from(document.querySelectorAll(".hint-label"));
const aboutPanel = document.getElementById("aboutPanel");

const viewOrder = ["trips", "map", "gallery"];

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
    mapTitle.textContent = "Pick a trip";
    mapRoute.textContent = "Swipe left when ready";
    mapImage.hidden = true;
    mapImage.src = "";
    mapImage.alt = "";
    mapEmpty.textContent = "Select a trip to load a map.";
    mapEmpty.hidden = false;
    galleryTitle.textContent = "Text";
    galleryRoute.textContent = "Swipe right for the map";
    galleryScroll.innerHTML = "";
    return;
  }

  mapTitle.textContent = trip.name;
  mapRoute.textContent = `${trip.route} - swipe left for text`;
  if (trip.map) {
    mapImage.src = trip.map;
    mapImage.alt = `${trip.name} map`;
    mapImage.hidden = false;
    mapEmpty.hidden = true;
  } else {
    mapImage.src = "";
    mapImage.alt = "";
    mapImage.hidden = true;
    mapEmpty.textContent = "Map coming soon.";
    mapEmpty.hidden = false;
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
            <img src="${item.src}" alt="${item.caption}" />
            <figcaption class="gallery-caption">${item.caption}</figcaption>
        `;
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
    if (state.hintFadeTimer) {
      clearTimeout(state.hintFadeTimer);
      state.hintFadeTimer = null;
    }
  }

  if (clamped === 0 && previousIndex !== 0 && !state.aboutOpen) {
    state.hintFadeContext = "trip";
  }

  rail.style.transition = animate
    ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";
  rail.style.transform = `translateX(${-clamped * 100}vw)`;
  updateHint();
}

function updateHint() {
  const currentView = state.aboutOpen ? "about" : viewOrder[state.viewIndex];
  hintLabels.forEach((label) => {
    label.classList.toggle("active", label.dataset.view === currentView);
  });
  const isHidingOnTrips = state.viewIndex === 0 && !state.aboutOpen;
  hintBar.classList.toggle("is-hidden", isHidingOnTrips);

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

  if (isHidingOnTrips && state.hintFadeContext && !state.hintFadeTimer) {
    state.hintFadeTimer = window.setTimeout(() => {
      state.hintFadeContext = null;
      state.hintFadeTimer = null;
      updateHint();
    }, 360);
  }
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
      if (state.viewIndex === 1) {
        nextIndex = 0;
      } else if (state.viewIndex === 0) {
        nextIndex = 0;
      } else {
        nextIndex = state.viewIndex - 1;
      }
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
    state.aboutOpen = true;
    aboutPanel?.classList.add("is-visible");
    updateHint();
    return;
  }
  if (view === "trips") {
    state.aboutOpen = false;
    aboutPanel?.classList.remove("is-visible");
    setView(0, true);
    return;
  }
  const index = viewOrder.indexOf(view);
  if (index === -1) return;
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

  hintBar.addEventListener("click", onHintClick);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);

  const aboutCard = document.getElementById("aboutCard");
  const openAbout = () => {
    state.aboutOpen = true;
    state.hintFadeContext = null;
    if (state.hintFadeTimer) {
      clearTimeout(state.hintFadeTimer);
      state.hintFadeTimer = null;
    }
    aboutPanel?.classList.add("is-visible");
    updateHint();
  };
  const closeAbout = () => {
    state.hintFadeContext = "about";
    state.aboutOpen = false;
    aboutPanel?.classList.remove("is-visible");
    updateHint();
  };

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
});
