// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for widgets
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const widgetObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('widget-loaded');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all widget containers
document.querySelectorAll('.widget-container').forEach(widget => {
    widgetObserver.observe(widget);
});

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        navbar.insertBefore(menuToggle, navMenu);
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('TradingView Widgets Showcase loaded successfully');
    
    // Log widget initialization
    const widgets = document.querySelectorAll('.tradingview-widget-container');
    console.log(`Initializing ${widgets.length} TradingView widgets`);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize any responsive features if needed
        console.log('Window resized');
    }, 250);
});