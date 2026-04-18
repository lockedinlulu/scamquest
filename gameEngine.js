/* =========================
   GAME STATE
========================= */
export const GameState = {
  score: 0,
  level: 1,
  currentMessage: null
};

/* =========================
   MESSAGE DATABASE
========================= */
const messages = [
  {
    sender: "Apple Support",
    text: "Your Apple ID has been locked. Verify now: apple-secure-login.ru",
    scam: true,
    reason: "Suspicious domain (.ru)"
  },
  {
    sender: "Mom",
    text: "Can you grab groceries later?",
    scam: false,
    reason: "Normal personal message"
  },
  {
    sender: "Netflix",
    text: "Payment failed. Update billing: netflix-secure-login.com",
    scam: true,
    reason: "Fake login domain"
  },
  {
    sender: "Bank",
    text: "Your account is locked. Click immediately to restore access.",
    scam: true,
    reason: "Urgency tactic"
  },
  {
    sender: "Friend",
    text: "yo are we still meeting tonight?",
    scam: false,
    reason: "Casual message"
  }
];

/* =========================
   GET RANDOM MESSAGE
========================= */
export function getMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  GameState.currentMessage = msg;
  return msg;
}

/* =========================
   SUBMIT ANSWER
========================= */
export function submitAnswer(isScamGuess) {
  const msg = GameState.currentMessage;

  if (!msg) return;

  const correct = msg.scam === isScamGuess;

  if (correct) {
    GameState.score += 10;
  } else {
    GameState.score -= 5;
  }

  return {
    correct,
    reason: msg.reason,
    score: GameState.score
  };
}