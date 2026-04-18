import { getMessage, submitAnswer, GameState } from "../game/gameEngine.js";

const app = document.getElementById("message-app");
const scoreDisplay = document.getElementById("score");

/* =========================
   INIT UI
========================= */
export function initGameUI() {
  updateScore();
}

/* =========================
   LOAD MESSAGE
========================= */
export function loadNextMessage() {
  const msg = getMessage();

  app.innerHTML = `
    <div class="message-card">
      <div class="message-sender">${msg.sender}</div>
      <div class="message-text">${msg.text}</div>

      <div class="decision-buttons">
        <button class="scam-btn" id="scamBtn">Scam 🚨</button>
        <button class="safe-btn" id="safeBtn">Safe ✅</button>
      </div>

      <div class="feedback" id="feedback"></div>
    </div>
  `;

  document.getElementById("scamBtn").onclick = () => handleAnswer(true);
  document.getElementById("safeBtn").onclick = () => handleAnswer(false);
}

/* =========================
   HANDLE ANSWER
========================= */
function handleAnswer(choice) {
  const result = submitAnswer(choice);

  const feedback = document.getElementById("feedback");

  feedback.textContent = result.correct
    ? "✅ Correct! " + result.reason
    : "❌ Wrong! " + result.reason;

  updateScore();

  setTimeout(() => {
    loadNextMessage();
  }, 1500);
}

/* =========================
   SCORE UI
========================= */
function updateScore() {
  scoreDisplay.textContent = "Score: " + GameState.score;
}