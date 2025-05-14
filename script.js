// Pestañas
document.querySelectorAll('.tab-button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Fetch datos
fetch('https://vercel-status-api.vercel.app/api/status')
  .then(r=>r.json())
  .then(data=>{
    // YouTube
    const yv=document.getElementById('latest-video');
    yv.innerHTML = data.lastYoutubeVideoId 
      ? `<iframe src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}" allowfullscreen></iframe>` 
      : '<p>No hay video reciente.</p>';

    // Twitch VOD
    const tv=document.getElementById('latest-twitch-vod');
    tv.innerHTML = data.lastTwitchVodId
      ? `<iframe src="https://player.twitch.tv/?video=${data.lastTwitchVodId}&parent=vercel-status-api.vercel.app" allowfullscreen></iframe>`
      : '<p>No hay VOD reciente.</p>';

    // Kick VOD
    const kv=document.getElementById('latest-kick-vod');
    kv.innerHTML = data.lastKickVodId
      ? `<iframe src="https://player.kick.com/embed/video/${data.lastKickVodId}" allowfullscreen></iframe>`
      : '<p>No hay VOD reciente.</p>';

    // Directos status
    document.getElementById('yt-status').textContent = data.youtubeLive?'🟥 YouTube (EN VIVO)':'🔴 YouTube (OFFLINE)';
    document.getElementById('twitch-status').textContent = data.twitchLive?'🟣 Twitch (EN VIVO)':'🟣 Twitch (OFFLINE)';
    document.getElementById('kick-status').textContent = '🟢 Kick (OFFLINE)';
  })
  .catch(console.error);
