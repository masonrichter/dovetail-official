/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== MENU HIDDEN =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== CHANGE BACKGROUND HEADER =====*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.hero__content, .section__title',{}); 
sr.reveal('.hero__img',{delay: 400});
sr.reveal('.hero__social-icon',{interval: 200});
sr.reveal('.about__img, .contact__form',{origin: 'left'});
sr.reveal('.about__content, .contact__content',{origin: 'right'});

/*===== OPTIMIZE FOR PRINT =====*/
function optimizeForPrint() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .header, .nav, .hero__actions {
                display: none !important;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.4;
                color: #000;
                background: #fff;
            }
            
            .hero, .section {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            
            .hero__title {
                font-size: 24pt;
                margin-bottom: 12pt;
            }
            
            .section__title {
                font-size: 18pt;
                margin: 24pt 0 12pt 0;
            }
            
            .service__card, .alliance__card, .blog__card {
                border: 1px solid #ccc;
                margin-bottom: 12pt;
                padding: 12pt;
                break-inside: avoid;
            }
            
            a {
                color: #000;
                text-decoration: underline;
            }
            
            .btn {
                border: 2px solid #000;
                padding: 6pt 12pt;
                display: inline-block;
                color: #000;
                background: #fff;
            }
        }
    `;
    document.head.appendChild(style);
}

optimizeForPrint();

/*===== NEWSLETTER MODAL =====*/
let newsletterModal;
let newsletterCloseBtn;
let newsletterForm;
let newsletterOverlay;
let newsletterTimer;

function initNewsletterModal() {
    newsletterModal = document.getElementById('newsletter-modal');
    newsletterCloseBtn = document.getElementById('newsletter-close');
    newsletterForm = document.getElementById('newsletter-form');
    newsletterOverlay = newsletterModal?.querySelector('.newsletter-modal__overlay');

    // Check if modal exists (only on main page)
    if (!newsletterModal) return;

    // Check if newsletter was already shown in this session
    if (sessionStorage.getItem('newsletterShown')) return;

    // Show newsletter after 20 seconds
    newsletterTimer = setTimeout(showNewsletterModal, 20000);

    // Close modal events
    if (newsletterCloseBtn) {
        newsletterCloseBtn.addEventListener('click', closeNewsletterModal);
    }

    if (newsletterOverlay) {
        newsletterOverlay.addEventListener('click', closeNewsletterModal);
    }

    // Form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newsletterModal && newsletterModal.classList.contains('show')) {
            closeNewsletterModal();
        }
    });
}

function showNewsletterModal() {
    if (newsletterModal && !sessionStorage.getItem('newsletterShown')) {
        newsletterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Mark as shown in session
        sessionStorage.setItem('newsletterShown', 'true');
        
        // Clear the timer
        if (newsletterTimer) {
            clearTimeout(newsletterTimer);
        }
    }
}

function closeNewsletterModal() {
    if (newsletterModal) {
        newsletterModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Clear timer if modal is closed before 20 seconds
        if (newsletterTimer) {
            clearTimeout(newsletterTimer);
        }
    }
}

function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput?.value;
    
    if (!email) return;
    
    // Show loading state
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual newsletter service)
    setTimeout(() => {
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        submitBtn.style.backgroundColor = 'var(--secondary-color)';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for subscribing! Check your email for confirmation.</p>
        `;
        successMessage.style.cssText = `
            text-align: center;
            color: var(--secondary-color);
            margin-top: var(--mb-1);
            padding: var(--mb-1);
            background: rgba(var(--secondary-color-rgb), 0.1);
            border-radius: 0.5rem;
        `;
        
        newsletterForm.appendChild(successMessage);
        
        // Close modal after 3 seconds
        setTimeout(() => {
            closeNewsletterModal();
        }, 3000);
        
        // Mark as subscribed to prevent showing again
        localStorage.setItem('newsletterSubscribed', 'true');
        
    }, 2000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user already subscribed
    if (localStorage.getItem('newsletterSubscribed')) {
        return; // Don't show modal if already subscribed
    }
    
    initNewsletterModal();
}); 