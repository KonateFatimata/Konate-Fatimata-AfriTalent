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



const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Fonction pour afficher/cacher l’erreur Bootstrap
    function validateField(input, condition, message) {
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if(!condition) {
            input.classList.add('is-invalid');
            if(feedback) feedback.textContent = message;
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    }
    
    // Validation
    validateField(nom, nom.value.trim() !== '', 'Le nom est requis');
    validateField(prenom, prenom.value.trim() !== '', 'Le prénom est requis');
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    validateField(email, emailRegex.test(email.value), 'Email invalide');
    
    validateField(message, message.value.trim().length >= 20, 'Message trop court, 20 caractères min');
    
    // Si tout est bon
    if(isValid) {
        alert('Message envoyé ! Notre équipe vous répond sous 24h');
        form.reset();
        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }
});

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.freelance-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        cards.forEach(card => {
            if(filter === 'all' || card.getAttribute('data-categorie') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        filterBtns.forEach(b => b.classList.remove('btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline-primary'));
        this.classList.remove('btn-outline-primary');
        this.classList.add('btn-primary');
    });
});