// Toggle tema
document.getElementById("theme-toggle").addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");
  document.getElementById("icon").textContent = body.classList.contains("dark") ? "🌙" : "☀️";
});

// Click para activar/desactivar destacado
document.querySelectorAll('.stream-box').forEach(box => {
  box.addEventListener('click', () => {
    const isActive = box.classList.contains('active');
    document.querySelectorAll('.stream-box').forEach(b => {
      b.classList.remove('active');
      b.querySelector('iframe').muted = true;
    });
    if (!isActive) {
      box.classList.add('active');
      box.querySelector('iframe').muted = false;
    }
  });
});

// Toggle chat
document.querySelectorAll(".toggle-chat").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const chatBox = document.querySelectorAll(".chat-box")[index];
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
  });
});

// Drag and drop stream-blocks
document.querySelectorAll('.stream-block').forEach(block => {
  block.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', block.outerHTML);
    block.classList.add('dragging');
  });
  block.addEventListener('dragend', () => {
    block.classList.remove('dragging');
  });
});
document.getElementById('stream-container').addEventListener('dragover', e => e.preventDefault());
document.getElementById('stream-container').addEventListener('drop', e => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const data = e.dataTransfer.getData('text/plain');
  if (dragging) {
    dragging.remove();
    e.target.closest('#stream-container').insertAdjacentHTML('beforeend', data);
  }
});

// Estado en vivo
fetch("https://vercel-status-api.vercel.app/api/status")
  .then(res => res.json())
  .then(data => {
    if (data.youtubeLive) {
      document.getElementById("yt-status").classList.add("live");
      document.getElementById("yt-status").textContent = "🟥 YouTube (EN VIVO)";
    } else {
      document.getElementById("yt-status").classList.add("offline");
    }
    if (data.twitchLive) {
      document.getElementById("twitch-status").classList.add("live");
      document.getElementById("twitch-status").textContent = "🟣 Twitch (EN VIVO)";
    } else {
      document.getElementById("twitch-status").classList.add("offline");
    }
    document.getElementById("kick-status").classList.add("offline");
  });