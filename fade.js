document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#about, #experience, #projects');

    // Function to fade in the text as the user scrolls
    const fadeInOnScroll = () => {
        sections.forEach((section) => {
            const textElements = section.querySelectorAll('.fade-text');
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Check if the section is in the viewport
            if (sectionTop < windowHeight * 0.8) {
                // Make text visible by changing opacity
                textElements.forEach((element) => {
                    element.style.opacity = 1; // Fade the text in
                });
            } else {
                // Keep the text hidden when section is out of view
                textElements.forEach((element) => {
                    element.style.opacity = 0; // Keep the text hidden
                });
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', fadeInOnScroll);

    // Trigger the function once on page load to handle initial state
    fadeInOnScroll();
});
