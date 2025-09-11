// Mobile menu toggle and accessibility handling
document.addEventListener('DOMContentLoaded', function(){
  const hambs = document.querySelectorAll('.hamburger');
  const panels = document.querySelectorAll('.mobile-panel');
  hambs.forEach(function(btn){
    btn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      panels.forEach(function(p){
        if(p.style.display === 'block'){ p.style.display = 'none'; p.setAttribute('aria-hidden','true'); }
        else { p.style.display = 'block'; p.setAttribute('aria-hidden','false'); }
      });
    });
  });

  // Close mobile panel when clicking a link
  document.querySelectorAll('.mobile-panel a').forEach(function(el){
    el.addEventListener('click', function(){ document.querySelectorAll('.mobile-panel').forEach(function(p){ p.style.display='none'; p.setAttribute('aria-hidden','true'); }); document.querySelectorAll('.hamburger').forEach(h=>h.setAttribute('aria-expanded','false')); });
  });
});