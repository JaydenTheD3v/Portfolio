/* =========================================
   STICKY NAVIGATION BAR
   ========================================= */

// Get the navbar element
const navbar = document.querySelector('.navbar');

// Listen for scroll events to darken navbar
window.addEventListener('scroll', function () {
    // Check if user has scrolled down more than 50 pixels
    if (window.scrollY > 50) {
        // Add the 'scrolled' class to make navbar darker
        navbar.classList.add('scrolled');
    } else {
        // Remove the 'scrolled' class when at top
        navbar.classList.remove('scrolled');
    }
});

/* =========================================
   SMOOTH SCROLL NAVIGATION
   ========================================= */

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add smooth scroll behavior to each link
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Get the target section from the link's href
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Scroll to the target section smoothly
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================================
   CTA BUTTON INTERACTIONS
   ========================================= */

// Get all primary buttons
const primaryButtons = document.querySelectorAll('.btn-primary');

// Add click events to primary buttons
primaryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Scroll to the projects section
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Get all secondary buttons
const secondaryButtons = document.querySelectorAll('.btn-secondary');

// Add click events to secondary buttons
secondaryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Scroll to the contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================================
   FORM SUBMISSION
   ========================================= */

// Get the contact form
const contactForm = document.querySelector('.contact-form');

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (in a real app, you'd send this to a server)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

/* =========================================
   SCROLL ANIMATIONS
   ========================================= */

// Simple fade-in animation for elements as they scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});
