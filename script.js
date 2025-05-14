// Pestañas
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Fetch al backend Vercel
fetch('https://vercel-status-api.vercel.app/api/status')
  .then(res => res.json())
  .then(data => {
    // Último video
    const lv = document.getElementById('latest-video');
    if (data.lastYoutubeVideoId) {
      lv.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}" allowfullscreen></iframe>`;
    } else {
      lv.innerHTML = '<p>No se encontró ningún video reciente.</p>';
    }

    // Últimos 5 videos
    const list = document.getElementById('video-list');
    list.innerHTML = '';
    (data.lastYoutubeVideos || []).forEach(v => {
      const a = document.createElement('a');
      a.href = `https://youtu.be/${v.videoId}`;
      a.target = '_blank';
      a.innerHTML = `<img src="${v.thumbnail}" alt=""><p>${v.title}</p>`;
      list.appendChild(a);
    });

    // Directos
    document.getElementById('yt-status').textContent = data.youtubeLive ? '🟥 YouTube (EN VIVO)' : '🔴 YouTube (OFFLINE)';
    document.getElementById('twitch-status').textContent = data.twitchLive ? '🟣 Twitch (EN VIVO)' : '🟣 Twitch (OFFLINE)';
    document.getElementById('kick-status').textContent = '🟢 Kick (OFFLINE)';
  })
  .catch(err => {
    console.error(err);
    document.getElementById('latest-video').innerHTML = '<p>Error al cargar los datos.</p>';
    document.getElementById('video-list').innerHTML = '<p>Error al cargar la lista.</p>';
  });