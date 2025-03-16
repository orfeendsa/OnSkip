// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuSpans = document.querySelectorAll('.mobile-menu-btn span');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuSpans.forEach((span, index) => {
        if (mobileMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuSpans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
        document.body.style.overflow = '';
    }
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuSpans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
            
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Update navbar
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animateElements = document.querySelectorAll('.benefit-card, .service-card, .case-study-card, .section-header, .contact-form, .contact-info');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stats and trigger animation
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target;
            const endValue = parseInt(statValue.getAttribute('data-value'));
            animateValue(statValue, 0, endValue, 2000);
            observer.unobserve(statValue);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        let isValid = true;
        let errorMessage = '';
        
        for (const [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Please fill in all fields.';
                break;
            }
            
            if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
                break;
            }
        }
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        
        if (!isValid) {
            submitButton.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
            submitButton.style.background = '#ef4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = 'var(--primary)';
            }, 3000);
            return;
        }
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = '#10b981';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = 'var(--primary)';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error sending message';
            submitButton.style.background = '#ef4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = 'var(--primary)';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Video Background Lazy Loading
const videoBackground = document.querySelector('.video-background video');
if (videoBackground) {
    videoBackground.addEventListener('loadeddata', () => {
        videoBackground.play();
    });
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoBackground.play();
            } else {
                videoBackground.pause();
            }
        });
    }, { threshold: 0 });
    
    videoObserver.observe(videoBackground);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Initialize AOS (Animate on Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Section scroll animations
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('fade-out');
            
            // Fade out other sections
            sections.forEach(section => {
                if (section !== entry.target) {
                    section.classList.add('fade-out');
                    section.classList.remove('visible');
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: "0px" });

sections.forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
}); 
