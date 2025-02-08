let nav = document.querySelector('nav');
let navHeight = nav.offsetHeight;

window.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) {  // If the mouse is near the top of the screen
        nav.style.top = '0'; // Show the nav
    } else {
        nav.style.top = `-${navHeight}px`; // Hide the nav
    }
});


