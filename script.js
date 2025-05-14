// Manejo de pestañas
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Función principal: obtiene datos de tu backend Vercel
fetch("https://vercel-status-api.vercel.app/api/status")
  .then(res => res.json())
  .then(data => {
    // 1) Último video
    const latestContainer = document.getElementById("latest-video");
    if (data.lastYoutubeVideoId) {
      latestContainer.innerHTML = `
        <iframe width="100%" height="360"
          src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}"
          frameborder="0" allowfullscreen>
        </iframe>`;
    } else {
      latestContainer.innerHTML = `<p>No se encontró ningún video reciente.</p>`;
    }

    // 2) Directos en vivo
    const ytStatus = document.getElementById("yt-status");
    if (data.youtubeLive) {
      ytStatus.classList.add("live");
      ytStatus.textContent = "🟥 YouTube (EN VIVO)";
    } else {
      ytStatus.classList.add("offline");
      ytStatus.textContent = "🔴 YouTube (OFFLINE)";
    }

    const twitchStatus = document.getElementById("twitch-status");
    if (data.twitchLive) {
      twitchStatus.classList.add("live");
      twitchStatus.textContent = "🟣 Twitch (EN VIVO)";
    } else {
      twitchStatus.classList.add("offline");
      twitchStatus.textContent = "🟣 Twitch (OFFLINE)";
    }

    // Kick no ofrece estado via API en tu backend, siempre mostrar offline
    const kickStatus = document.getElementById("kick-status");
    kickStatus.classList.add("offline");
    kickStatus.textContent = "🟢 Kick (OFFLINE)";
  })
  .catch(err => {
    console.error("Error al llamar al backend:", err);
    document.getElementById("latest-video").innerHTML =
      `<p>Error al cargar datos. Intenta recargar la página.</p>`;
  });
