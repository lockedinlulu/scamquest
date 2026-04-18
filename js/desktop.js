console.log("DESKTOP JS LOADED");

import { initGameUI, loadNextMessage } from "./messages.js";

/* =========================
   GLOBAL STATE (ONLY ONCE)
========================= */
let viewerOpen = false;
let currentIndex = 0;

/* =========================
   CLOCK
========================= */
function startClock() {
  const timeEl = document.getElementById("time");
  if (!timeEl) return;

  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }, 1000);
}

/* =========================
   INIT EVERYTHING
========================= */
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  startClock();
  initGameUI();

  /* =========================
     ELEMENTS
  ========================= */
  const openPhotosBtn = document.getElementById("openPhotos");
  const photosWindow = document.getElementById("photos-window");
  const photosMain = document.getElementById("photosMain");
  const macbook = document.getElementById("macbook");

  const openMessagesBtn = document.getElementById("openMessages");
  const closeMessagesBtn = document.getElementById("closeMessages");
  const messagesWindow = document.getElementById("messages-window");

  /* =========================
     PHOTOS DATA
  ========================= */
  const images = [
    "https://picsum.photos/800?random=1",
    "https://picsum.photos/800?random=2",
    "https://picsum.photos/800?random=3",
    "https://picsum.photos/800?random=4",
    "https://picsum.photos/800?random=5"
  ];

  /* =========================
     OPEN PHOTOS APP
  ========================= */
  openPhotosBtn?.addEventListener("click", () => {
    console.log("Photos opened");

    photosWindow.classList.remove("hidden");
    photosMain.innerHTML = `<p class="hint">Select a device to view photos</p>`;
  });

  /* =========================
     MACBOOK CLICK → GRID VIEW
  ========================= */
  macbook?.addEventListener("click", () => {
    console.log("MacBook clicked");

    photosMain.innerHTML = "";

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "10px";

    images.forEach((src, index) => {
      const img = document.createElement("img");

      img.src = src;
      img.style.width = "100%";
      img.style.cursor = "pointer";
      img.style.borderRadius = "0px";

      img.addEventListener("click", () => {
        openViewer(index, images, photosMain);
      });

      grid.appendChild(img);
    });

    photosMain.appendChild(grid);
  });

  /* =========================
     VIEWER (SINGLE CLEAN VERSION)
  ========================= */
  function openViewer(index, images, container) {
    viewerOpen = true;
    currentIndex = index;

    container.innerHTML = `
      <div style="
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:15px;
      ">

        <button id="prevBtn"
          style="font-size:26px;background:rgba(0,0,0,0.6);color:white;border:none;padding:6px 10px;cursor:pointer;">
          ‹
        </button>

        <img src="${images[currentIndex]}" style="
          max-width:80%;
          max-height:70vh;
          object-fit:contain;
          border-radius:0px;
        ">

        <button id="nextBtn"
          style="font-size:26px;background:rgba(0,0,0,0.6);color:white;border:none;padding:6px 10px;cursor:pointer;">
          ›
        </button>

      </div>
    `;

    document.getElementById("prevBtn").onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openViewer(currentIndex, images, container);
    };

    document.getElementById("nextBtn").onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      openViewer(currentIndex, images, container);
    };
  }

  /* =========================
     KEYBOARD CONTROLS
  ========================= */
  window.addEventListener("keydown", (e) => {
    if (!viewerOpen) return;

    if (!images.length) return;

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openViewer(currentIndex, images, photosMain);
    }

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      openViewer(currentIndex, images, photosMain);
    }

    if (e.key === "Escape") {
      viewerOpen = false;
      photosMain.innerHTML = `<p class="hint">Select a device to view photos</p>`;
    }
  });

  /* =========================
     MESSAGES WINDOW
  ========================= */
  openMessagesBtn?.addEventListener("click", () => {
    messagesWindow?.classList.remove("hidden");
    loadNextMessage();
  });

  closeMessagesBtn?.addEventListener("click", () => {
    messagesWindow?.classList.add("hidden");
  });

  /* =========================
     MAC WINDOW BUTTONS (SAFE)
  ========================= */
  const red = document.querySelector(".dot.red");
  const yellow = document.querySelector(".dot.yellow");
  const green = document.querySelector(".dot.green");

  red?.addEventListener("click", () => {
    photosWindow?.classList.add("hidden");
  });

  yellow?.addEventListener("click", () => {
    photosWindow.style.display = "none";
    setTimeout(() => (photosWindow.style.display = ""), 150);
  });

  green?.addEventListener("click", () => {
    photosWindow?.classList.toggle("fullscreen");
  });
});

document.getElementById("closePhotos")?.addEventListener("click", () => {
  photosWindow?.classList.add("hidden");
});