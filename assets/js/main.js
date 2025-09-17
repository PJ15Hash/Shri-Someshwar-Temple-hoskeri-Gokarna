document.addEventListener('DOMContentLoaded', function(){
  try {
    document.body.classList.add('with-footer');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger && navLinks){
      hamburger.addEventListener('click', ()=> navLinks.classList.toggle('open'));
    }

    document.querySelectorAll('.slider').forEach(slider => {
      const imgs = Array.from(slider.querySelectorAll('img'));
      if(imgs.length === 0) return;
      const slidesWrap = document.createElement('div');
      slidesWrap.className = 'slides';
      imgs.forEach(img => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt || '';
        slide.appendChild(newImg);
        slidesWrap.appendChild(slide);
      });
      slider.innerHTML = '';
      slider.appendChild(slidesWrap);
      const slides = slidesWrap.querySelectorAll('.slide');
      if(slides.length <= 1) return;
      let index = 0;
      const next = ()=>{
        index = (index + 1) % slides.length;
        slidesWrap.style.transform = 'translateX(' + (-index * 100) + '%)';
      };
      let interval = setInterval(next, 3500);
      slider.addEventListener('mouseenter', ()=> clearInterval(interval));
      slider.addEventListener('mouseleave', ()=> interval = setInterval(next, 3500));
    });

    document.querySelectorAll('[data-video]').forEach(btn => {
      btn.addEventListener('click', ()=>{
        const src = btn.getAttribute('data-video');
        const lb = document.createElement('div');
        lb.style.position='fixed'; lb.style.inset=0; lb.style.background='rgba(0,0,0,0.95)'; lb.style.display='flex'; lb.style.alignItems='center'; lb.style.justifyContent='center'; lb.style.zIndex=99999;
        const iframe = document.createElement('iframe'); iframe.src=src; iframe.width='90%'; iframe.height='70%'; iframe.frameBorder='0'; iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; iframe.allowFullscreen=true;
        lb.appendChild(iframe);
        lb.addEventListener('click', ()=> document.body.removeChild(lb));
        document.body.appendChild(lb);
      });
    });
  } catch(e) { console.error('Init error', e); }
});