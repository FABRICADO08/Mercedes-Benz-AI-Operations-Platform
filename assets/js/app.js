"use strict";

const App = {
  version: "1.0.0",
  initialized: false,

  init() {
    if (this.initialized) return;
    this.hideLoader();
    this.initialized = true;
  },

  hideLoader() {
    const loader = document.getElementById("loadingScreen");
    if (!loader) return;

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => loader.remove(), 500);
    }, 800);
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
