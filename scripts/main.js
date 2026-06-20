// Mobile Menu Toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Simple animation for the tech tags
        document.addEventListener('DOMContentLoaded', function() {
            const techTags = document.querySelectorAll('.tech-tag');
            
            techTags.forEach((tag, index) => {
                // Add slight delay for staggered animation
                tag.style.animationDelay = `${index * 0.1}s`;
                tag.classList.add('fade-in');
            });
        });

        // Animate skill progress bars when section comes into view
        document.addEventListener('DOMContentLoaded', function() {
            const skillSections = document.querySelectorAll('.skill-progress');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
            
            // Function to animate progress bars
            function animateSkills() {
                skillSections.forEach(skill => {
                    if (isInViewport(skill)) {
                        const level = skill.getAttribute('data-level');
                        skill.style.width = level + '%';
                    }
                });
            }
            
            // Animate on load and scroll
            animateSkills();
            window.addEventListener('scroll', animateSkills);
            
            // Add hover effects to skill items
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(8px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        });

       

        const viewMoreBtn = document.getElementById('viewMoreBtn');
    const certificates = document.querySelectorAll('.certificate-card');
    let expanded = false;

    viewMoreBtn.addEventListener('click', () => {
        if (!expanded) {
            certificates.forEach(card => card.style.display = 'flex');
            viewMoreBtn.textContent = 'View Less';
            expanded = true;
        } else {
            certificates.forEach((card, index) => {
                card.style.display = index < 3 ? 'flex' : 'none';
            });
            viewMoreBtn.textContent = 'View More';
            expanded = false;
        }
    });

    const viewMoreProjectsBtn = document.getElementById('viewMoreProjectsBtn');
    const projectCards = document.querySelectorAll('.project-card');
    let projectsExpanded = false;

    viewMoreProjectsBtn.addEventListener('click', () => {
        if (!projectsExpanded) {
            projectCards.forEach(card => card.style.display = 'flex');
            viewMoreProjectsBtn.textContent = 'View Less';
            projectsExpanded = true;
        } else {
            projectCards.forEach((card, index) => {
                card.style.display = index < 3 ? 'flex' : 'none';
            });
            viewMoreProjectsBtn.textContent = 'View More';
            projectsExpanded = false;
        }
    });

        
    // View More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (viewMoreBtn && projectsGrid) {
        viewMoreBtn.addEventListener('click', function() {
            // Toggle the show-all class
            projectsGrid.classList.toggle('show-all');
            
            // Update button text
            if (projectsGrid.classList.contains('show-all')) {
                viewMoreBtn.innerHTML = '<i class="fas fa-eye-slash"></i> View Less';
            } else {
                viewMoreBtn.innerHTML = '<i class="fas fa-eye"></i> View More Projects';
            }
        });
    }
});

// images
// Image Switcher
const switcherImgs = document.querySelectorAll('.switcher-img');
let currentImg = 0;

setInterval(() => {
    switcherImgs[currentImg].classList.remove('active');
    currentImg = (currentImg + 1) % switcherImgs.length;
    switcherImgs[currentImg].classList.add('active');
}, 3000);

// Web3Forms Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formResult = document.getElementById('formResult');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            formResult.style.display = 'block';
            formResult.style.background = 'rgba(16, 185, 129, 0.1)';
            formResult.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            formResult.style.color = '#10b981';
            formResult.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
            contactForm.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        formResult.style.display = 'block';
        formResult.style.background = 'rgba(239, 68, 68, 0.1)';
        formResult.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formResult.style.color = '#ef4444';
        formResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

        // Hide message after 5 seconds
        setTimeout(() => {
            formResult.style.display = 'none';
        }, 5000);
    }
});