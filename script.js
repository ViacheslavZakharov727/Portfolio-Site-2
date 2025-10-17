document.addEventListener('DOMContentLoaded',()=>{
  // language toggle
  const btn=document.getElementById('lang-toggle');let lang=localStorage.getItem('lang')||'en';
  function setLang(l){document.querySelectorAll('[data-en]').forEach(el=>el.textContent=el.getAttribute('data-'+l)||el.textContent);
  btn.textContent=l==='en'?'DE':'EN';localStorage.setItem('lang',l);lang=l;}
  setLang(lang);
  btn.addEventListener('click',()=>setLang(lang==='en'?'de':'en'));

  // fade-in on load
  requestAnimationFrame(()=>{ document.body.classList.remove('preload'); });

  // uniform transitions between pages (0.6s linear)
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(!href||href.startsWith('http'))return;
      e.preventDefault();
      document.body.classList.add('preload'); // opacity -> 0 in 0.6s linear
      setTimeout(()=>window.location.href=href,600);
    });
  });

  // modal viewer with scroll lock
  const modal=document.getElementById('modal');
  const modalImg=document.getElementById('modalImg');
  const close=document.getElementById('closeModal');
  function openModal(src){ if(!modal) return; modalImg.src=src; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeModal(){ if(!modal) return; modal.setAttribute('aria-hidden','true'); modalImg.src=''; document.body.style.overflow=''; }
  document.querySelectorAll('.btn-view').forEach(b=> b.addEventListener('click', ()=> openModal(b.dataset.img)));
  close && close.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  window.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal && modal.getAttribute('aria-hidden')==='false'){ closeModal(); }});
});