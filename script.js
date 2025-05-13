// Tabs functionality
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Fetch from backend Vercel
fetch("https://vercel-status-api.vercel.app/api/status")
  .then(res => res.json())
  .then(data => {
    // Latest YouTube video
    if (data.lastYoutubeVideoId) {
      document.getElementById('latest-video').innerHTML =
        `<iframe width="100%" height="360" src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      document.getElementById('latest-video').textContent = "No se encontró último video.";
    }
    // Live statuses
    if (data.youtubeLive) {
      const yt = document.getElementById("yt-status");
      yt.classList.add("live");
      yt.textContent = "🟥 YouTube (EN VIVO)";
    } else {
      document.getElementById("yt-status").classList.add("offline");
    }
    if (data.twitchLive) {
      const tw = document.getElementById("twitch-status");
      tw.classList.add("live");
      tw.textContent = "🟣 Twitch (EN VIVO)";
    } else {
      document.getElementById("twitch-status").classList.add("offline");
    }
    document.getElementById("kick-status").classList.add("offline");
  })
  .catch(err => console.error("Error al obtener data del backend:", err));