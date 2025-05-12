fetch("https://vercel-status-api.vercel.app/api/status")
  .then(res => res.json())
  .then(data => {
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
  .catch(err => console.error("Error al verificar estado en vivo:", err));