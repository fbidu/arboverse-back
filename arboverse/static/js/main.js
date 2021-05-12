const navSlide = () => {
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
    //Toggler Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');


           //Animation links
    navLinks.forEach((link, menu) => {
        if(link.style.animation){
            link.style.animation = '';
        }else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${menu / 7 + 0.5}s`;
        }
         });

         //buger animation
         burger.classList.toggle('toggle');

    });
 
}
navSlide();