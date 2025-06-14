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