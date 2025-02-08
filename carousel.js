document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.cutout');
    
    carousels.forEach(carousel => {
        const slides = Array.from(carousel.querySelectorAll('.content-slide'));
        const prevBtn = carousel.querySelector('.left-arrow');
        const nextBtn = carousel.querySelector('.right-arrow');
        let currentIndex = 0;
        
        // Function to update slide visibility
        const updateSlides = () => {
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        };
        
        // Initialize first slide
        updateSlides();
        
        // Next slide function
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        };
        
        // Previous slide function
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        };
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Optional: Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
    });
});