// Manejo de pestañas
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Llamada al backend Vercel
fetch("https://vercel-status-api.vercel.app/api/status")
  .then(res => res.json())
  .then(data => {
    // Último video
    const latest = document.getElementById("latest-video");
    if (data.lastYoutubeVideoId) {
      latest.innerHTML = `<iframe width="100%" height="360" src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      latest.innerHTML = `<p>No se encontró ningún video reciente.</p>`;
    }

    // YouTube live
    const ys = document.getElementById("yt-status");
    if (data.youtubeLive) {
      ys.classList.add("live");
      ys.textContent = "🟥 YouTube (EN VIVO)";
    } else {
      ys.classList.add("offline");
      ys.textContent = "🔴 YouTube (OFFLINE)";
    }

    // Twitch live
    const ts = document.getElementById("twitch-status");
    if (data.twitchLive) {
      ts.classList.add("live");
      ts.textContent = "🟣 Twitch (EN VIVO)";
    } else {
      ts.classList.add("offline");
      ts.textContent = "🟣 Twitch (OFFLINE)";
    }

    // Kick always offline
    const ks = document.getElementById("kick-status");
    ks.classList.add("offline");
    ks.textContent = "🟢 Kick (OFFLINE)";
  })
  .catch(err => {
    console.error(err);
    document.getElementById("latest-video").innerHTML = `<p>Error al cargar datos.</p>`;
  });