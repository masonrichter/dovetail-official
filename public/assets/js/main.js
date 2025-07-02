/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', (e)=>{
            e.stopPropagation();
            nav.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== MENU HIDDEN =====*/
const navLink = document.querySelectorAll('.nav__link')
const navMenu = document.getElementById('nav-menu')
const navClose = document.getElementById('nav-close')

function hideMenu() {
    if (navMenu) {
        navMenu.classList.remove('show-menu')
        document.body.style.overflow = '';
    }
}

// Close menu when clicking on a nav link
navLink.forEach(n => n.addEventListener('click', hideMenu))

// Close menu when clicking the close button
if (navClose) {
    navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        hideMenu();
    })
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show-menu') && 
        !navMenu.contains(e.target) && 
        !document.getElementById('nav-toggle').contains(e.target)) {
        hideMenu();
    }
})

// Handle touch swipe to close menu
let touchStartX = 0;
let touchEndX = 0;

navMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

navMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 100;
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right - close menu
        hideMenu();
    }
}

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
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });

    // Homepage animations
    // Homepage animations
    sr.reveal('.hero__content, .section__title',{}); 
    sr.reveal('.hero__img',{delay: 400});
    sr.reveal('.hero__social-icon',{interval: 200});
    sr.reveal('.about__img, .contact__form',{origin: 'left'});
    sr.reveal('.about__content, .contact__content',{origin: 'right'});
    
    // Universal animations for all pages  
    sr.reveal('.blog__card',{interval: 300, origin: 'bottom'});
    sr.reveal('.team__member, .card',{interval: 200});
    sr.reveal('.cta, .section__header',{origin: 'bottom', delay: 200});
    sr.reveal('.btn, .blog__link',{delay: 100, interval: 150});

}

/*===== PRINT OPTIMIZATION =====*/
function optimizeForPrint() {
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            .nav, .footer, .scroll-top, .btn--secondary {
                display: none !important;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 20pt;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
                margin-top: 20pt;
            }
            
            p, li {
                orphans: 3;
                widows: 3;
            }
            
            a {
                color: #000;
                text-decoration: underline;
            }
            
            .btn {
                border: 2pt solid #000;
                padding: 6pt 12pt;
                display: inline-block;
                color: #000;
                background: #fff;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    optimizeForPrint();
});

/*==================== MOBILE MENU ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    /* Show menu */
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    /* Hide menu */
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    /* Close menu when clicking outside */
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show-menu') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });

    /* Close menu when clicking a nav link */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });

    /* Handle touch events for better mobile experience */
    let touchStartX = 0;
    let touchEndX = 0;

    navMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    navMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left - close menu
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    }
});

/*===== SECURITY CONFIGURATIONS =====*/
// Prevent XSS in dynamic content
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Secure event handlers
function addSecureEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, (e) => {
            try {
                handler(e);
            } catch (error) {
                console.error('Error in event handler:', error);
            }
        });
    }
}

// Secure localStorage wrapper
const secureStorage = {
    set: function(key, value) {
        try {
            const sanitizedKey = sanitizeHTML(key);
            const sanitizedValue = typeof value === 'string' ? sanitizeHTML(value) : JSON.stringify(value);
            localStorage.setItem(sanitizedKey, sanitizedValue);
        } catch (e) {
            console.error('Error setting localStorage:', e);
        }
    },
    get: function(key) {
        try {
            const sanitizedKey = sanitizeHTML(key);
            return localStorage.getItem(sanitizedKey);
        } catch (e) {
            console.error('Error getting localStorage:', e);
            return null;
        }
    }
};

// Security check for external links
function secureExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        if (!link.href.startsWith(window.location.origin)) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
        }
    });
}

// Form input validation
function validateFormInput(input) {
    const value = input.value.trim();
    const type = input.getAttribute('type');
    
    switch(type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'tel':
            return /^[\d\s-+()]{10,}$/.test(value);
        case 'text':
            return value.length > 0 && value.length <= 255;
        default:
            return true;
    }
}

// Initialize security measures
document.addEventListener('DOMContentLoaded', function() {
    secureExternalLinks();
    
    // Secure all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            form.querySelectorAll('input, textarea').forEach(input => {
                if (!validateFormInput(input)) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Process form submission
                console.log('Form is valid, processing submission...');
            }
        });
    });
});

// Mobile Menu Functionality
const navMenu = document.querySelector('.nav__menu');
const navToggle = document.querySelector('.nav__toggle');
const navClose = document.querySelector('.nav__close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = ''; // Restore scrolling
  });
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = ''; // Restore scrolling
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('show-menu') && 
      !navMenu.contains(e.target) && 
      !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = ''; // Restore scrolling
  }
});

// Add touch event handling for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
  if (navMenu.classList.contains('show-menu')) {
    e.preventDefault(); // Prevent page scroll when menu is open
  }
}, { passive: false });

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY;
  const touchDiff = touchStartY - touchEndY;

  // If swipe down is detected when menu is open, close it
  if (navMenu.classList.contains('show-menu') && touchDiff < -50) {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = '';
  }
});

// Add active link state
function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active-link');
      } else {
        navLink?.classList.remove('active-link');
      }
    });
  });
}

setActiveLink();

// Add smooth scrolling for iOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


});








