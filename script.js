document.querySelectorAll('.tab-button').forEach(btn=>{btn.onclick=()=>{document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));btn.classList.add('active');document.getElementById(btn.dataset.tab).classList.add('active');};});
fetch('https://vercel-status-api.vercel.app/api/status').then(r=>r.json()).then(data=>{
  const lv=document.getElementById('latest-video');
  if(data.lastYoutubeVideoId) lv.innerHTML=`<iframe src="https://www.youtube.com/embed/${data.lastYoutubeVideoId}" allowfullscreen></iframe>`;
  else lv.innerHTML='<p>No se encontró ningún video reciente.</p>';
  const list=document.getElementById('video-list'); list.innerHTML='';
  if(Array.isArray(data.lastYoutubeVideos)) data.lastYoutubeVideos.forEach(v=>{const a=document.createElement('a');a.href=`https://youtu.be/${v.videoId}`;a.target='_blank';a.innerHTML=`<img src="${v.thumbnail}" alt=""><p>${v.title}</p>`;list.appendChild(a);});
  document.getElementById('yt-status').textContent=data.youtubeLive?'🟥 YouTube (EN VIVO)':'🔴 YouTube (OFFLINE)';
  document.getElementById('twitch-status').textContent=data.twitchLive?'🟣 Twitch (EN VIVO)':'🟣 Twitch (OFFLINE)';
  document.getElementById('kick-status').textContent='🟢 Kick (OFFLINE)';
}).catch(e=>{console.error(e);document.getElementById('latest-video').innerHTML='<p>Error al cargar.</p>';document.getElementById('video-list').innerHTML='<p>Error al cargar.</p>';});
