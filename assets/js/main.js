/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-panel .close');

  if(hamburger){
    hamburger.addEventListener('click', ()=>{
      panel.classList.add('open');
      overlay.classList.add('show');
    });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', ()=>{
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
  if(overlay){
    overlay.addEventListener('click', ()=>{
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Simple lightbox for gallery images
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.src;
      const lb = document.createElement('div');
      lb.style.position='fixed'; lb.style.inset=0; lb.style.background='rgba(0,0,0,0.85)'; lb.style.display='flex'; lb.style.alignItems='center'; lb.style.justifyContent='center'; lb.style.zIndex=99999;
      const im = document.createElement('img'); im.src=src; im.style.maxWidth='90%'; im.style.maxHeight='90%'; im.style.borderRadius='8px';
      lb.appendChild(im);
      lb.addEventListener('click', ()=>document.body.removeChild(lb));
      document.body.appendChild(lb);
    });
  });
});