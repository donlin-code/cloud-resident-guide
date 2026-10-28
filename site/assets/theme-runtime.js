(() => {
  const root=document.documentElement,button=document.getElementById('themeToggle');
  if(!button)return;
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  let saved=null;
  try{saved=localStorage.getItem('cloud-resident-theme');}catch{}
  if(!['light','dark'].includes(saved))saved=null;
  function apply(theme){root.dataset.theme=theme;const dark=theme==='dark';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'切换到浅色模式':'切换到深色模式');button.querySelector('.theme-symbol').textContent=dark?'☀':'☾';button.querySelector('.theme-toggle-label').textContent=dark?'浅色':'深色';}
  apply(saved||(media.matches?'dark':'light'));
  button.addEventListener('click',()=>{saved=root.dataset.theme==='dark'?'light':'dark';apply(saved);try{localStorage.setItem('cloud-resident-theme',saved);}catch{}});
  media.addEventListener('change',event=>{if(!saved)apply(event.matches?'dark':'light');});
  window.addEventListener('storage',event=>{if(event.key==='cloud-resident-theme'){saved=['light','dark'].includes(event.newValue)?event.newValue:null;apply(saved||(media.matches?'dark':'light'));}});
})();
