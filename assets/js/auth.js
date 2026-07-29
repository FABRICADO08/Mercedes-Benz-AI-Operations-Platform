"use strict";

const Auth = {
  stream: null,

  init() {
    this.bindLogin();
    this.bindFaceRecognition();
    this.restoreSession();
  },

  bindLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.login();
    });
  },

  login() {
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const status = document.getElementById("status");

    if (!email || !password) {
      if (status) status.textContent = "Please enter email and password.";
      return;
    }

    localStorage.setItem("authenticated", "true");
    localStorage.setItem("mbUser", email);

    if (status) status.textContent = "Authentication successful.";
    window.location.href = "dashboard.html";
  },

  bindFaceRecognition() {
    const button = document.getElementById("faceLogin");
    if (!button) return;

    button.addEventListener("click", () => this.startCamera());
  },

  async startCamera() {
    const video = document.getElementById("camera");
    const status = document.getElementById("status");
    if (!video) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });

      video.srcObject = this.stream;
      if (status) status.textContent = "Scanning face...";

      setTimeout(() => this.fakeRecognition(), 3500);
    } catch (error) {
      console.error(error);
      if (status) status.textContent = "Camera permission denied.";
    }
  },

  fakeRecognition() {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("mbUser", "facial.user");
    window.location.href = "dashboard.html";
  },

  restoreSession() {
    if (localStorage.getItem("authenticated") === "true" && window.location.pathname.includes("login")) {
      window.location.href = "dashboard.html";
    }
  },

  logout() {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("mbUser");

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }

    window.location.href = "login.html";
  }
};

document.addEventListener("DOMContentLoaded", () => Auth.init());
