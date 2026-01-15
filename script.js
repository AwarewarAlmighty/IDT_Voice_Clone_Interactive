const globalPlayer = document.getElementById("globalPlayer");
const nowSub = document.getElementById("nowSub");
const statusDot = document.getElementById("statusDot");

function stopAll() {
  // stop all embedded <audio> in cards
  document.querySelectorAll("article.card audio").forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  // stop global player
  globalPlayer.pause();
  globalPlayer.removeAttribute("src");
  globalPlayer.load();

  statusDot.classList.remove("playing");
  nowSub.textContent = "Nothing yet — click a figure or a quote.";
}

function playAudio(id) {
  // pause any card audios
  document.querySelectorAll("article.card audio").forEach(a => {
    if (!a.paused) a.pause();
    a.currentTime = 0;
  });

  // find requested audio element
  const selected = document.getElementById(id);
  if (!selected) return;

  // set global player to that src
  globalPlayer.src = selected.getAttribute("src");
  globalPlayer.play().catch(() => { /* browser autoplay restrictions */ });

  // UI updates
  statusDot.classList.add("playing");
  nowSub.textContent = `Playing: ${labelFor(id)}`;
}

function labelFor(id) {
  const map = {
    // Lee
    lee1: "Lee Kuan Yew — Quote 1",
    lee2: "Lee Kuan Yew — Quote 2",
    // Tunku
    tunku1: "Tunku Abdul Rahman — Quote 1",
    tunku2: "Tunku Abdul Rahman — Quote 2",
    // Marshall
    marshall1: "David Marshall — Archival Clip"
  };
  return map[id] || id;
}

// When audio ends, reset status dot
globalPlayer.addEventListener("ended", () => {
  statusDot.classList.remove("playing");
});
