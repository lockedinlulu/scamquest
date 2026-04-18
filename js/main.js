import { loginUser } from "../firebase.js";
import { initGameUI, loadNextMessage } from "./messages.js";/* =========================
   ELEMENTS
========================= */
const loginScreen = document.getElementById("login-screen");
const desktop = document.getElementById("desktop");

const loginBtn = document.getElementById("loginBtn");

console.log("loginBtn =", loginBtn);const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const openMessagesBtn = document.getElementById("openMessages");
const messagesWindow = document.getElementById("messages-window");
const closeMessagesBtn = document.getElementById("closeMessages");

/* =========================
   LOGIN FLOW
========================= */
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    message.textContent = "Logging in...";
    await loginUser(email, password);
    window.location.href = "desktop.html";

    // switch screens
    loginScreen.classList.add("hidden");
    desktop.classList.remove("hidden");

    // init game UI AFTER login
    initGameUI();

  } catch (err) {
    message.textContent = "Login failed";
    console.error(err);
  }
});

/* =========================
   SIGNUP FLOW
========================= */
import { signupUser } from "../firebase.js";

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("signupBtn");

  console.log("signup page loaded");

  if (!btn) {
    console.log("❌ signup button not found");
    return;
  }

  btn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("trying signup:", email);

    try {
      const res = await signupUser(email, password);
      window.location.href = "desktop.html";
      console.log("✅ signup success:", res.user);
      

      alert("Account created!");
      window.location.href = "index.html";

    } catch (err) {
      console.error("❌ SIGNUP ERROR:", err.code, err.message);
      alert(err.message);
    }
  });
});

/* =========================
   WINDOW CONTROLS
========================= */
if (openMessagesBtn && messagesWindow) {
  openMessagesBtn.addEventListener("click", () => {
    messagesWindow.classList.remove("hidden");
    loadNextMessage();
  });
}

if (closeMessagesBtn && messagesWindow) {
  closeMessagesBtn.addEventListener("click", () => {
    messagesWindow.classList.add("hidden");
  });
}

/* =========================
   TIME
========================= */
function startClock() {
  const timeEl = document.getElementById("time");
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    timeEl.textContent = timeStr;
  }

  updateTime(); // run immediately
  setInterval(updateTime, 1000);
}

window.addEventListener("DOMContentLoaded", startClock);
/* =========================
   POWER BUTTONS
========================= */
document.getElementById("shutdownBtn").onclick = () => {
  document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:40vh;'>Shutting down...</h1>";
};

document.getElementById("restartBtn").onclick = () => {
  location.reload();
};

document.getElementById("sleepBtn").onclick = () => {
  document.body.style.filter = "brightness(0.3)";
};



// ----- guest button
const guestBtn = document.getElementById("guestBtn");

guestBtn?.addEventListener("click", () => {
  console.log("Guest mode activated");

  document.getElementById("login-screen")?.classList.add("hidden");
  document.getElementById("desktop")?.classList.remove("hidden");

  document.getElementById("message").textContent = "Guest session started";

  initGameUI();
});