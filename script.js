// Pestañas
document.querySelectorAll('.tab-button').forEach(b=>{
  b.onclick=()=>{document.querySelectorAll('.tab-button').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); document.getElementById(b.dataset.tab).classList.add('active');
  };
});
// Último video
fetch('https://vercel-status-api.vercel.app/api/status').then(r=>r.json()).then(d=>{
  const lv=document.getElementById('latest-video');
  if(d.lastYoutubeVideoId) lv.innerHTML=`<iframe src="https://www.youtube.com/embed/${d.lastYoutubeVideoId}" allowfullscreen></iframe>`;
  else lv.innerHTML='<p>No hay video reciente.</p>';
  // live statuses
  document.getElementById('yt-status').textContent=d.youtubeLive?'🟥 YouTube (EN VIVO)':'🔴 YouTube (OFFLINE)';
  document.getElementById('twitch-status').textContent=d.twitchLive?'🟣 Twitch (EN VIVO)':'🟣 Twitch (OFFLINE)';
  document.getElementById('kick-status').textContent='🟢 Kick (OFFLINE)';
}).catch(e=>{
  document.getElementById('latest-video').innerHTML='<p>Error al cargar último video.</p>';
});
// Últimos 5 videos
fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`)
.then(r=>r.json()).then(d=>{
  const list=document.getElementById('video-list'); list.innerHTML='';
  if(d.items) d.items.forEach(i=>{
    const vid=i.id.videoId, url=`https://www.youtube.com/watch?v=${vid}`;
    const a=document.createElement('a'); a.href=url; a.target='_blank';
    a.innerHTML=`<img src="${i.snippet.thumbnails.medium.url}"><p>${i.snippet.title}</p>`;
    list.append(a);
  });
}).catch(e=>{
  document.getElementById('video-list').innerHTML='<p>Error al cargar lista.</p>';
});