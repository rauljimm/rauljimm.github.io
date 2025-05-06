// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Add scroll event listener for sections animation
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to animate elements when they come into view
function animateOnScroll() {
    const animateItems = document.querySelectorAll('.animate-item');
    
    animateItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition) {
            anime({
                targets: item,
                opacity: 1,
                translateY: 0,
                duration: 800,
                easing: 'easeOutCubic'
            });
        }
    });
}

// Initialize animations for hero section elements
function initAnimations() {
    // Hero section animation
    const heroTimeline = anime.timeline({
        easing: 'easeOutCubic',
        duration: 800
    });
    
    const heroElements = document.querySelectorAll('.hero .animate-item');
    
    heroTimeline.add({
        targets: heroElements[0], // H1
        opacity: [0, 1],
        translateY: [30, 0],
    })
    .add({
        targets: heroElements[1], // Subtitle
        opacity: [0, 1],
        translateY: [30, 0],
    }, '-=600')
    .add({
        targets: heroElements[2], // Buttons
        opacity: [0, 1],
        translateY: [30, 0],
    }, '-=600');
    
    // Initial animation for visible elements
    animateOnScroll();
    
    // Add hover animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add hover animations for skill categories
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            anime({
                targets: skill,
                translateY: -5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        skill.addEventListener('mouseleave', () => {
            anime({
                targets: skill,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add hover animations for contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                translateY: -5,
                backgroundColor: 'rgba(107, 93, 246, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                translateY: 0,
                backgroundColor: 'var(--dark-surface)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add hover effect for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            anime({
                targets: e.target.querySelector('::after'),
                width: '100%',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add animation for architecture diagram in project details
    if (document.querySelector('.architecture-diagram')) {
        const archComponents = document.querySelectorAll('.arch-component');
        
        anime.timeline({
            easing: 'easeOutCubic',
            duration: 800
        })
        .add({
            targets: archComponents[0],
            opacity: [0, 1],
            translateX: [-30, 0],
        })
        .add({
            targets: document.querySelectorAll('.arch-arrow')[0],
            opacity: [0, 1],
            width: [0, '100%'],
        }, '-=400')
        .add({
            targets: archComponents[1],
            opacity: [0, 1],
            translateY: [30, 0],
        }, '-=400')
        .add({
            targets: document.querySelectorAll('.arch-arrow')[1],
            opacity: [0, 1],
            width: [0, '100%'],
        }, '-=400')
        .add({
            targets: archComponents[2],
            opacity: [0, 1],
            translateX: [30, 0],
        }, '-=400');
    }
    
    // Add subtle floating animation to project icons
    document.querySelectorAll('.project-icon').forEach(icon => {
        anime({
            targets: icon,
            translateY: [0, -10, 0],
            duration: 3000,
            loop: true,
            easing: 'easeInOutSine',
            direction: 'alternate'
        });
    });
} 