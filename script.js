// Animation au défilement
document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Effet d'onde
    document.addEventListener('mousemove', (e) => {
        // Créer un nouvel élément pour l'onde
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        // Positionner l'onde
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        
        // Taille aléatoire pour varier l'effet
        const size = Math.random() * (200 - 100) + 100;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.marginLeft = -(size/2) + 'px';
        ripple.style.marginTop = -(size/2) + 'px';
        
        // Ajouter l'onde au body
        document.body.appendChild(ripple);
        
        // Déclencher l'animation
        requestAnimationFrame(() => {
            ripple.classList.add('animate');
        });
        
        // Nettoyer l'élément après l'animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }, { passive: true });

    // Effet de parallaxe sur le titre
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.main-title');
        const scrolled = window.scrollY;
        title.style.opacity = Math.max(0.3, 1 - (scrolled / 500));
        title.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    // Animation d'apparition des séries au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.series-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Animation du menu
const menuItems = document.querySelectorAll('.menu a');
menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transition = 'letter-spacing 0.3s ease';
        item.style.letterSpacing = '2px';
    });

    item.addEventListener('mouseout', () => {
        item.style.letterSpacing = '1px';
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const seriesItems = document.querySelectorAll('.series-item');
    
    seriesItems.forEach(item => {
        const mainImage = item.querySelector('.series-image img');
        const modal = item.querySelector('.gallery-modal');
        const closeBtn = modal.querySelector('.close-gallery');
        const gallery = modal.querySelector('.gallery-images');
        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        let currentIndex = 0;
        const images = gallery.querySelectorAll('img');

        mainImage.addEventListener('click', () => {
            modal.style.display = 'block';
            gallery.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        modal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        modal.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    prevBtn.click();
                } else {
                    nextBtn.click();
                }
            }
        }

        // Initialize first image
        showImage(0);
    });
});