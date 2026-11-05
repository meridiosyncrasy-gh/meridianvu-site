/* Site navigation: mobile menu, More dropdown, copy email. Progressive enhancement. */
(function(){
  var d=document, root=d.documentElement; root.classList.add('js');
  var hdr=d.querySelector('header.nav'); if(!hdr) return;
  var mbtn=hdr.querySelector('.menu-btn'), menu=d.getElementById('site-menu');
  var more=hdr.querySelector('.more-btn'), mpanel=d.getElementById('more-panel');
  function setMore(open){ if(!more) return; more.setAttribute('aria-expanded',open); mpanel.hidden=!open; }
  function setMenu(open,focusBack){ if(!mbtn) return; hdr.classList.toggle('open',open); mbtn.setAttribute('aria-expanded',open);
    mbtn.querySelector('.lbl').textContent=open?'Close':'Menu'; if(!open&&focusBack) mbtn.focus(); }
  if(mbtn) mbtn.addEventListener('click',function(){ var o=mbtn.getAttribute('aria-expanded')!=='true'; setMenu(o);
    if(o){ var f=menu.querySelector('a'); if(f && mbtn.matches(':focus-visible')) f.focus(); } });
  if(more) more.addEventListener('click',function(e){ e.stopPropagation(); setMore(more.getAttribute('aria-expanded')!=='true'); });
  if(menu) menu.addEventListener('click',function(e){ if(e.target.closest('a')){ setMenu(false); setMore(false);} });
  d.addEventListener('click',function(e){ if(!hdr.contains(e.target)){ setMenu(false); setMore(false);} else if(more && !e.target.closest('.more')) setMore(false); });
  d.addEventListener('keydown',function(e){ if(e.key==='Escape'){ if(more&&more.getAttribute('aria-expanded')==='true'){ setMore(false); more.focus(); }
    else if(hdr.classList.contains('open')) setMenu(false,true); } });
  if(mpanel) mpanel.addEventListener('focusout',function(e){ if(!e.relatedTarget||!e.relatedTarget.closest||!e.relatedTarget.closest('.more')) setMore(false); });
  /* copy email */
  d.querySelectorAll('.copy-email').forEach(function(b){ b.addEventListener('click',function(){
    var em=b.getAttribute('data-email'), lbl=b.textContent;
    var ok=function(){ b.textContent='Email copied'; setTimeout(function(){ b.textContent=lbl; },2200); };
    var fail=function(){ var n=b.parentNode.querySelector('.copy-note'); if(n) n.hidden=false; };
    if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(em).then(ok,fail); } else fail();
  }); });
})();
/* Analytics events (Google Analytics 4). Runs only if gtag is on the page. */
(function(){
  var d=document;
  function ev(name,params){ if(typeof window.gtag==='function') window.gtag('event',name,params||{}); }
  d.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a,button'); if(!a) return;
    var href=a.getAttribute('href')||'', txt=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,80);
    if(a.classList.contains('copy-email')){ ev('copy_email',{link_text:txt}); return; }
    if(href.indexOf('mailto:')===0){
      var subj=(href.split('subject=')[1]||'').split('&')[0]; try{subj=decodeURIComponent(subj);}catch(_){}
      var pkg=a.classList.contains('ask')?subj.replace(/^Project inquiry:\s*/,''):'';
      ev('generate_lead',{method:'email',link_text:txt,email_subject:subj,package_name:pkg});
      if(pkg) ev('ask_package',{package_name:pkg});
      return;
    }
    if(href.indexOf('linkedin.com')>-1){ ev('linkedin_click',{link_text:txt}); return; }
    if(a.classList.contains('menu-btn')&&a.getAttribute('aria-expanded')==='false') ev('open_mobile_menu');
  },true);
})();
