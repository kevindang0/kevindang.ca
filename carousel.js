document.addEventListener('DOMContentLoaded', () => {
    // Get all sections with the cutout class
    const sections = document.querySelectorAll('.cutout');

    sections.forEach(section => {
        const slides = section.querySelectorAll('.content-slide');
        const leftArrow = section.querySelector('.left-arrow');
        const rightArrow = section.querySelector('.right-arrow');
        let currentSlide = 0;

        // Show the first slide with the 'active' class
        slides[currentSlide].classList.add('active');

        // Function to show the next slide with smooth opacity transition
        const showNextSlide = () => {
            // Remove 'active' from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide (circular loop)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add 'active' class to the next slide with smooth opacity transition
            slides[currentSlide].classList.add('active');
        };

        // Function to show the previous slide with smooth opacity transition
        const showPreviousSlide = () => {
            // Remove 'active' from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to previous slide (circular loop)
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            
            // Add 'active' class to the previous slide with smooth opacity transition
            slides[currentSlide].classList.add('active');
        };

        // Event listeners for the arrows
        rightArrow.addEventListener('click', showNextSlide);
        leftArrow.addEventListener('click', showPreviousSlide);

        // Automatically transition every 5 seconds (optional)
        // setInterval(showNextSlide, 20000);
    });
});
