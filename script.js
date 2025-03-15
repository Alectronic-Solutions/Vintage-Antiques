// Navigation Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Check if href is just # or has a valid section id
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    
    // Add transition class before toggling dark mode
    body.style.transition = 'all 0.5s ease';
    document.querySelectorAll('*').forEach(element => {
        element.style.transition = 'all 0.5s ease';
    });

    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.className = 'fas fa-sun';
    } else {
        darkModeToggle.className = 'fas fa-moon';
    }

    // Remove transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
        document.querySelectorAll('*').forEach(element => {
            element.style.transition = '';
        });
    }, 500);
}

// Form Submission Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been sent.`);
            document.getElementById('contactForm').reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// Touch Events for Watch Interfaces
document.addEventListener('DOMContentLoaded', () => {
    const touchArea = document.body;
    let touchstartY = 0;
    let touchendY = 0;

    touchArea.addEventListener('touchstart', e => {
        touchstartY = e.changedTouches[0].screenY;
    });

    touchArea.addEventListener('touchend', e => {
        touchendY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchendY - touchstartY;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < 0) {
                // Swipe up - show nav
                document.querySelector('.nav-links').style.transform = 'translateY(0)';
            } else {
                // Swipe down - hide nav
                document.querySelector('.nav-links').style.transform = 'translateY(100%)';
            }
        }
    }
});

// Video Background Optimization
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    
    // Pause video when not in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.2 });
    
    if (video) {
        observer.observe(video);
        
        // Reduce video quality on mobile
        if (window.innerWidth < 768) {
            video.setAttribute('playbackQuality', 'small');
        }
    }
});

// Modal Functionality
function openModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id.replace('Modal', ''));
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            closeModal(modal.id.replace('Modal', ''));
        });
    }
});
