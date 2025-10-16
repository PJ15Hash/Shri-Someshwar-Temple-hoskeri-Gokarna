document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-panel .close');
  const aboutBtns = document.querySelectorAll('[data-scroll]');

  if(hamburger){
    hamburger.addEventListener('click', ()=>{ panel.classList.add('open'); overlay.classList.add('show'); });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', ()=>{ panel.classList.remove('open'); overlay.classList.remove('show'); });
  }
  if(overlay){
    overlay.addEventListener('click', ()=>{ panel.classList.remove('open'); overlay.classList.remove('show'); });
  }

  aboutBtns.forEach(btn=>{
    btn.addEventListener('click', function(e){
      e.preventDefault();
      const sel = this.getAttribute('data-scroll');
      const target = document.querySelector(sel);
      if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); panel.classList.remove('open'); overlay.classList.remove('show'); }
    });
  });

  // Image lightbox
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.src;
      const lb = document.createElement('div');
      lb.style.position='fixed'; lb.style.inset=0; lb.style.background='rgba(0,0,0,0.85)'; lb.style.display='flex'; lb.style.alignItems='center'; lb.style.justifyContent='center'; lb.style.zIndex=99999;
      const im = document.createElement('img'); im.src = src; im.style.maxWidth='90%'; im.style.maxHeight='90%'; im.style.borderRadius='8px';
      lb.appendChild(im);
      lb.addEventListener('click', ()=>document.body.removeChild(lb));
      document.body.appendChild(lb);
    });
  });

  // Video overlay for elements with data-video
  document.querySelectorAll('[data-video]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-video');
      const lb = document.createElement('div');
      lb.style.position='fixed'; lb.style.inset=0; lb.style.background='rgba(0,0,0,0.95)'; lb.style.display='flex'; lb.style.alignItems='center'; lb.style.justifyContent='center'; lb.style.zIndex=99999;
      const iframe = document.createElement('iframe'); iframe.src = src; iframe.width='90%'; iframe.height='70%'; iframe.frameBorder='0'; iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; iframe.allowFullscreen = true;
      lb.appendChild(iframe);
      lb.addEventListener('click', ()=>document.body.removeChild(lb));
      document.body.appendChild(lb);
    });
  });
});

// Add this code to your existing main.js file after the existing code

// ============================================
// GALLERY SLIDER
// ============================================
(function() {
  const gallerySlider = document.getElementById('gallerySlider');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  const galleryDotsContainer = document.getElementById('galleryDots');
  
  if (!gallerySlider) return;
  
  const slides = gallerySlider.querySelectorAll('.gallery-slide');
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    galleryDotsContainer.appendChild(dot);
  });
  
  const dots = galleryDotsContainer.querySelectorAll('.slider-dot');
  
  function updateSlider() {
    gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  
  if (galleryNext) galleryNext.addEventListener('click', nextSlide);
  if (galleryPrev) galleryPrev.addEventListener('click', prevSlide);
  
  // Auto-play (optional)
  let autoplayInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  gallerySlider.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  gallerySlider.parentElement.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  gallerySlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  gallerySlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
})();

// ============================================
// COMMITTEE SLIDER
// ============================================
(function() {
  const committeeSlider = document.getElementById('committeeSlider');
  const committeePrev = document.getElementById('committeePrev');
  const committeeNext = document.getElementById('committeeNext');
  
  if (!committeeSlider) return;
  
  const slides = committeeSlider.querySelectorAll('.committee-slide');
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Calculate slides to show based on screen width
  function getSlidesToShow() {
    if (window.innerWidth <= 900) return 1;
    return 3;
  }
  
  let slidesToShow = getSlidesToShow();
  
  function updateSlider() {
    const slideWidth = committeeSlider.querySelector('.committee-slide').offsetWidth;
    const gap = 16;
    const offset = currentIndex * (slideWidth + gap);
    committeeSlider.style.transform = `translateX(-${offset}px)`;
  }
  
  function nextSlide() {
    const maxIndex = totalSlides - slidesToShow;
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back
    }
    updateSlider();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - slidesToShow; // Loop to end
    }
    updateSlider();
  }
  
  if (committeeNext) committeeNext.addEventListener('click', nextSlide);
  if (committeePrev) committeePrev.addEventListener('click', prevSlide);
  
  // Auto-play (optional)
  let autoplayInterval = setInterval(nextSlide, 4000);
  
  // Pause on hover
  committeeSlider.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  committeeSlider.parentElement.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 4000);
  });
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  committeeSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  committeeSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
  
  // Update on window resize
  window.addEventListener('resize', () => {
    slidesToShow = getSlidesToShow();
    updateSlider();
  });
})();