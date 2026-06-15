window.addEventListener('DOMContentLoaded', function() {
    // Curseur personnalisé
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));

    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Mise à jour automatique de l'année
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Barre de progression de lecture
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }
    });

    // Gestion de la barre de navigation au défilement
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navbar');
        if (nav) { // Vérifie si la navbar existe
            if (window.scrollY > 50) {
                nav.classList.add('scrolled', 'shadow');
            } else {
                nav.classList.remove('scrolled', 'shadow');
            }
        }
    });

    // Observateur pour les animations d'apparition (Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Si l'élément contient des compteurs, on les anime
                if (entry.target.classList.contains('counter-wrap')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 secondes
                        const increment = target / (duration / 16);
                        
                        let current = 0;
                        const update = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(update);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        update();
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .counter-wrap').forEach((el) => observer.observe(el));

    // Effet Magnétique sur les boutons d'appel à l'action
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline-light');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function() {
            submitBtn.innerText = 'Envoi...';
        });
    }

    // Amélioration du carousel
    const photoCarousel = document.getElementById('photoCarousel');
    if (photoCarousel) {
        // Pause au survol
        photoCarousel.addEventListener('mouseenter', function() {
            const carousel = bootstrap.Carousel.getOrCreateInstance(this);
            if (carousel) {
                carousel.pause();
            }
        });
        
        // Reprendre à la sortie
        photoCarousel.addEventListener('mouseleave', function() {
            const carousel = bootstrap.Carousel.getOrCreateInstance(this);
            if (carousel) {
                carousel.cycle();
            }
        });

        // Navigation au clavier
        photoCarousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                const carousel = bootstrap.Carousel.getOrCreateInstance(this);
                if (carousel) {
                    carousel.prev();
                }
            } else if (e.key === 'ArrowRight') {
                const carousel = bootstrap.Carousel.getOrCreateInstance(this);
                if (carousel) {
                    carousel.next();
                }
            }
        });

        // Rendre focusable pour la navigation au clavier
        photoCarousel.setAttribute('tabindex', '0');
    }

    // Gestion du Chat IA
    const chatBtn = document.getElementById('chatBtn');
    const chatWin = document.getElementById('chatWin');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatBtn && chatWin && chatInput && chatBody) {
        // Ouvrir/Fermer la fenêtre
        chatBtn.onclick = function(e) {
            e.preventDefault();
            chatWin.classList.toggle('active');
            if (chatWin.classList.contains('active')) {
                chatInput.focus();
            }
        };

        // Envoyer un message
        chatInput.onkeydown = function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const msg = chatInput.value.trim();
                
                if (msg !== '') {
                    chatInput.value = '';
                    
                    // Affichage message utilisateur
                    const userDiv = document.createElement('div');
                    userDiv.className = 'mb-2 text-end';
                    userDiv.innerHTML = `<strong>Moi:</strong><br>${msg}`;
                    chatBody.appendChild(userDiv);
                    
                    // Scroll auto
                    chatBody.scrollTop = chatBody.scrollHeight;
                    
                    // Appel API vers l'endpoint Django
                    fetch(`/api/chat/?message=${encodeURIComponent(msg)}`)
                        .then(res => res.json())
                        .then(data => {
                            const aiDiv = document.createElement('div');
                            aiDiv.className = 'mb-2 text-start';
                            aiDiv.style.color = '#FF6600'; // Orange BKG
                            aiDiv.innerHTML = `<strong>BKG:</strong><br>${data.response}`;
                            chatBody.appendChild(aiDiv);
                            chatBody.scrollTop = chatBody.scrollHeight;
                        })
                        .catch(err => {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'mb-2 text-start text-danger';
                            errorDiv.innerHTML = `<strong>Erreur:</strong><br>Impossible de contacter l'assistant.`;
                            chatBody.appendChild(errorDiv);
                            console.error("Erreur Chat:", err);
                        });
                }
            }
        };
    }
});

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}
