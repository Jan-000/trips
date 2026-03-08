const trips = [
  {
    id: "bensersiel",
    name: "Nordsee",
    route: "from Bad Zwischenhahn to Bensersiel",
    map: "maps/bensersiel.png",
    gallery: [
      {
        src: "images/bensersiel/bensersiel2.png",
        caption: "Salt air, long rides, and the horizon never stops.",
      },
      {
        src: "images/bensersiel/trip2.png",
        caption: "Coastal paths and endless views.",
      },
      {
        src: "images/bensersiel/trip2_2.png",
        caption: "Where the land meets the sea.",
      },
      {
        src: "images/bensersiel/trip2_2_2.png",
        caption: "Final stop before the North Sea.",
      },
    ],
  },
  {
    id: "boltenhagen",
    name: "Ostsee",
    route: "from Schwerin to Boltenhagen",
    map: "maps/boltenhagen.png",
    gallery: [
      {
        src: "images/boltenhagen/boltenhagen.png",
        caption: "Low light, cold water, and quiet roads.",
      },
      {
        src: "images/boltenhagen/boltenhagen2.png",
        caption: "Baltic coastline in the distance.",
      },
    ],
  },
  {
    id: "oderbruch",
    name: "Oderbruchbahn",
    route: "from Wriezen to Letschin",
    map: "maps/oderbruch.png",
    gallery: [
      {
        src: "images/oderbruch/oderbruch.png",
        caption: "Historic railway through the marshlands.",
      },
      {
        src: "images/oderbruch/oderbruch2.png",
        caption: "Rolling countryside and forgotten tracks.",
      },
      {
        src: "images/oderbruch/oderbruch3.png",
        caption: "Where time moves slowly.",
      },
      {
        src: "images/oderbruch/trip1.png",
        caption: "Journey through the Oderbruch.",
      },
    ],
  },
];

const state = {
  viewIndex: 0,
  activeTrip: null,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragOffset: 0,
  dragLock: null,
  hasCapture: false,
  galleryTouchStartX: 0,
  galleryTouchStartY: 0,
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

  if (!trip) {
    mapTitle.textContent = "Pick a trip";
    mapRoute.textContent = "Swipe left when ready";
    mapImage.hidden = true;
    mapImage.src = "";
    mapImage.alt = "";
    mapEmpty.hidden = false;
    galleryTitle.textContent = "Text";
    galleryRoute.textContent = "Swipe right for the map";
    galleryScroll.innerHTML = "";
    return;
  }

  mapTitle.textContent = trip.name;
  mapRoute.textContent = `${trip.route} - swipe left for text`;
  mapImage.src = trip.map;
  mapImage.alt = `${trip.name} map`;
  mapImage.hidden = false;
  mapEmpty.hidden = true;
  galleryTitle.textContent = `${trip.name} text`;
  galleryRoute.textContent = "Swipe right for the map";
  renderGallery(trip.gallery);
}

function renderGallery(items) {
  galleryScroll.innerHTML = "";
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
  const clamped = Math.max(0, Math.min(viewOrder.length - 1, index));
  state.viewIndex = clamped;
  rail.style.transition = animate
    ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";
  rail.style.transform = `translateX(${-clamped * 100}vw)`;
  updateHint();
}

function updateHint() {
  const currentView = viewOrder[state.viewIndex];
  hintLabels.forEach((label) => {
    label.classList.toggle("active", label.dataset.view === currentView);
  });
}

function onPointerDown(event) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  state.isDragging = true;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragOffset = -state.viewIndex * window.innerWidth;
  state.dragLock = null;
  state.hasCapture = false;
  rail.style.transition = "none";
}

function onPointerMove(event) {
  if (!state.isDragging) return;
  const deltaX = event.clientX - state.dragStartX;
  const deltaY = event.clientY - state.dragStartY;

  if (!state.dragLock) {
    if (Math.abs(deltaX) > 12) {
      state.dragLock = "x";
    } else if (Math.abs(deltaY) > 12) {
      state.dragLock = "y";
    }
  }

  if (state.dragLock === "x" && !state.hasCapture) {
    rail.setPointerCapture(event.pointerId);
    state.hasCapture = true;
  }

  if (state.dragLock === "y") {
    return;
  }

  const maxOffset = 0;
  const minOffset = -(viewOrder.length - 1) * window.innerWidth;
  let nextOffset = state.dragOffset + deltaX;
  nextOffset = Math.max(minOffset - 120, Math.min(maxOffset + 120, nextOffset));
  rail.style.transform = `translateX(${nextOffset}px)`;
}

function onPointerUp(event) {
  if (!state.isDragging) return;
  state.isDragging = false;
  if (state.hasCapture) {
    rail.releasePointerCapture(event.pointerId);
    state.hasCapture = false;
  }

  // Only navigate if drag was not vertical
  if (state.dragLock === "y") {
    return;
  }

  const deltaX = event.clientX - state.dragStartX;
  const threshold = window.innerWidth * 0.18;
  let nextIndex = state.viewIndex;

  if (Math.abs(deltaX) > threshold) {
    nextIndex = deltaX < 0 ? state.viewIndex + 1 : state.viewIndex - 1;
  }

  setView(nextIndex, true);
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
  const index = viewOrder.indexOf(view);
  if (index === -1) return;
  setView(index, true);
}

function onResize() {
  setView(state.viewIndex, false);
}

function onGalleryTouchStart(event) {
  const touch = event.touches[0];
  if (!touch) return;
  state.galleryTouchStartX = touch.clientX;
  state.galleryTouchStartY = touch.clientY;
}

function onGalleryTouchEnd(event) {
  if (state.viewIndex !== 2) return;
  const touch = event.changedTouches[0];
  if (!touch) return;

  const deltaX = touch.clientX - state.galleryTouchStartX;
  const deltaY = touch.clientY - state.galleryTouchStartY;

  const isRightSwipe = deltaX > 56;
  const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

  if (isRightSwipe && mostlyHorizontal) {
    setView(1, true);
  }
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
  setActiveTrip(initial.tripId || trips[0].id);
  setView(initial.viewIndex, false);

  rail.addEventListener("pointerdown", onPointerDown);
  rail.addEventListener("pointermove", onPointerMove);
  rail.addEventListener("pointerup", onPointerUp);
  rail.addEventListener("pointercancel", onPointerUp);
  rail.addEventListener("pointerleave", onPointerUp);

  galleryScroll.addEventListener("touchstart", onGalleryTouchStart, {
    passive: true,
  });
  galleryScroll.addEventListener("touchend", onGalleryTouchEnd, {
    passive: true,
  });

  hintBar.addEventListener("click", onHintClick);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
});
