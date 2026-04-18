console.log("login.js loaded", document.getElementById("loginBtn"));
import { loginUser, signupUser } from "../firebase.js";

/* =========================
   LOGIN
========================= */
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    try {
      message.textContent = "Logging in...";
      await loginUser(emailInput.value, passwordInput.value);
      window.location.href = "desktop.html";
    } catch (err) {
      message.textContent = "Login failed";
      console.error(err);
    }
  });
}
/* =========================
   SIGNUP
========================= */
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      await signupUser(email, password);

      alert("Account created!");
      window.location.href = "index.html";

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });
}