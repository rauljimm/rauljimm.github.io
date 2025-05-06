// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations specific to the restaurant details page
    initRestaurantPageAnimations();
});

// Function to initialize restaurant page specific animations
function initRestaurantPageAnimations() {
    // Animate feature cards with staggered delay
    const featureCards = document.querySelectorAll('.feature-card');
    anime.timeline({
        easing: 'easeOutCubic',
        duration: 800
    })
    .add({
        targets: featureCards,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100)
    });

    // Animate phone mockup
    if (document.querySelector('.phone-mockup')) {
        anime({
            targets: '.phone-mockup',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutCubic',
            duration: 1000
        });
        
        // Animate app interface elements
        setTimeout(() => {
            anime({
                targets: '.app-header',
                translateY: [-20, 0],
                opacity: [0, 1],
                easing: 'easeOutQuad',
                duration: 500
            });
            
            anime({
                targets: '.table-item',
                scale: [0.8, 1],
                opacity: [0, 1],
                easing: 'easeOutElastic(1, .6)',
                duration: 800,
                delay: anime.stagger(150)
            });
            
            anime({
                targets: '.app-nav',
                translateY: [20, 0],
                opacity: [0, 1],
                easing: 'easeOutQuad',
                duration: 500,
                delay: 300
            });
        }, 500);
    }

    // Animate tech items with staggered delay
    const techItems = document.querySelectorAll('.tech-item');
    anime({
        targets: techItems,
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(30),
        easing: 'easeOutQuad',
        duration: 600
    });

    // Animate roadmap items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        
        anime({
            targets: item,
            opacity: 0,
            translateX: 30 * direction,
            duration: 0
        });
    });

    // Setup scroll observers for roadmap items
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const roadmapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const index = Array.from(roadmapItems).indexOf(item);
                const direction = index % 2 === 0 ? -1 : 1;
                
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateX: [30 * direction, 0],
                    easing: 'easeOutQuad',
                    duration: 800
                });
                
                roadmapObserver.unobserve(item);
            }
        });
    }, observerOptions);

    roadmapItems.forEach(item => {
        roadmapObserver.observe(item);
    });

    // Animate code window
    if (document.querySelector('.code-window')) {
        anime({
            targets: '.code-window',
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutQuad',
            duration: 800,
            delay: 300
        });
    }

    // Floating animation for feature icons
    anime({
        targets: '.feature-icon',
        translateY: [0, -10, 0],
        easing: 'easeInOutSine',
        duration: 3000,
        delay: anime.stagger(200),
        loop: true
    });

    // Apply hover effect for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
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

    // GitHub buttons hover effect
    document.querySelectorAll('.github-buttons .button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
} 