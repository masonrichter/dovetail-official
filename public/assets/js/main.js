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
