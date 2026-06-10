const toggleBtn = document.getElementById('theme-toggle');
const navbar = document.querySelector('.navbar'); // change .navbar par ta classe
const backToTop = document.getElementById('back-to-top');

// Charge le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
if(toggleBtn) toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Toggle au clic
toggleBtn?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Scroll navbar + bouton
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
    backToTop?.classList.add('show');
  } else {
    navbar?.classList.remove('scrolled');
    backToTop?.classList.remove('show');
  }
});

// Retour haut
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animation compteur
      if (entry.target.classList.contains('counter')) {
        const target = +entry.target.dataset.target;
        let count = 0;
        const speed = 200; // plus c'est petit plus ça va vite
        
        const updateCount = () => {
          count += target / speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count);
            setTimeout(updateCount, 10);
          } else {
            entry.target.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section, .counter').forEach(el => observer.observe(el));