// Reveal on scroll
const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold: 0.12}) : null;
document.querySelectorAll('.reveal').forEach(el=>{ if(io) io.observe(el); else el.classList.add('in'); });

// Smooth scroll fallback
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id && id.length>1 && document.querySelector(id)){ e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:'smooth'}); }
  });
});

/* Contact form 
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new URLSearchParams({
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      category: form.category.value,
      message: form.message.value
    });

    // Use urlencoded (CORS-safelisted) + no-cors -> no preflight, and we don't read the body.
    try {
      await fetch("https://script.google.com/macros/s/AKfycbw9u2hTxOwEDHLXhQbp-AAjqy4CGt0RfAHj09z0mNwqCkT2oibIrP0uNOcbtnGmWY5xOg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: data.toString()
      });
      document.getElementById('success').style.display = 'block';
      document.getElementById('error').style.display = 'none';
      form.reset();
    } catch (err) {
      document.getElementById('success').style.display = 'none';
      document.getElementById('error').style.display = 'block';
    }
  });
}

*/

// Docs TOC highlight on scroll
const tocLinks = document.querySelectorAll('.toc a');
const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = '#' + entry.target.id;
      tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
},{rootMargin: '-50% 0px -40% 0px', threshold: 0.01}) : null;
sections.forEach(sec => spy && spy.observe(sec));

// Fake queue tick (simple)
setInterval(()=>{
  const dots = document.querySelectorAll('.queue-item .small:last-child');
  dots.forEach((el,i)=>{
    if(el.textContent.includes('Queued')){
      el.textContent = 'Queued';
    }
  });
}, 4000);

// Year stamp
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
