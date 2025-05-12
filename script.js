document.querySelectorAll('.stream-box').forEach(box => {
  box.addEventListener('click', () => {
    document.querySelectorAll('.stream-box').forEach(b => {
      b.classList.remove('active');
      b.querySelector('iframe').muted = true;
    });
    box.classList.add('active');
    box.querySelector('iframe').muted = false;
  });

  box.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', box.outerHTML);
    box.classList.add('dragging');
  });

  box.addEventListener('dragend', () => {
    box.classList.remove('dragging');
  });
});

document.getElementById('stream-container').addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.getElementById('stream-container').addEventListener('drop', (e) => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const data = e.dataTransfer.getData('text/plain');
  if (dragging) {
    dragging.remove();
    e.target.closest('#stream-container').insertAdjacentHTML('beforeend', data);
  }
});

// 🔁 Verifica si estás en vivo y actualiza estado
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

    document.getElementById("kick-status").classList.add("offline"); // sin API
  })
  .catch(err => console.error("Error al verificar estado en vivo:", err));