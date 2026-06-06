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