const friction = 0.05;
const maxVelocity = 200; // Maximum allowed velocity to prevent excessive jumps
let lastScrollTime = 0; // Timestamp to track when the last scroll occurred
const scrollDelay = 1000; // 1 second delay between scroll ticks
let currentSectionIndex = 0; // Track the current section index

class SmoothScroll {
    constructor() {
        this.vely = 0; // Initial velocity
        this.currentScroll = window.scrollY; // Start from current scroll position
        this.targetScroll = this.currentScroll; // Initially target the current scroll position
        this.sections = Array.from(document.querySelectorAll('section')); // Get all sections
        
        // Start smooth scrolling immediately
        this.smoothScroll();
    }

    // Smooth scroll function
    smoothScroll() {
        // Interpolate between the current and target scroll positions
        this.currentScroll += (this.targetScroll - this.currentScroll) * 0.1;

        // Apply smooth scroll by setting the scroll position
        window.scrollTo(0, this.currentScroll);

        // Apply friction to velocity
        this.vely *= friction;

        // Continue smooth scrolling until we are close enough to the target
        if (Math.abs(this.targetScroll - this.currentScroll) > 0.5 || Math.abs(this.vely) > 0.1) {
            requestAnimationFrame(() => this.smoothScroll());
        }
    }

    // Accelerate based on wheel delta
    accelerate(deltaY) {
        // Add velocity based on the scroll delta
        this.vely += deltaY * 0.9;

        // Clamp the velocity to prevent excessive jumps
        this.vely = Math.max(-maxVelocity, Math.min(this.vely, maxVelocity));

        // Adjust target scroll position
        this.targetScroll += this.vely;

        // Ensure the target scroll position stays within bounds
        this.targetScroll = Math.max(0, Math.min(this.targetScroll, document.body.scrollHeight - window.innerHeight));

        // Start or continue smooth scroll animation
        this.smoothScroll();
    }

    // Scroll to the next or previous section based on direction
    scrollToSection(direction) {
        const sectionCount = this.sections.length;

        if (direction === "down" && currentSectionIndex < sectionCount - 1) {
            currentSectionIndex++;
        } else if (direction === "up" && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        this.targetScroll = this.sections[currentSectionIndex].offsetTop;
        this.smoothScroll();
    }
}

// Initialize smooth scrolling instance
const smoothScrollInstance = new SmoothScroll();

// Listen for wheel events to accelerate the scroll
window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scroll behavior

    const now = Date.now();
    // Only trigger scroll if 1 second has passed since the last scroll
    if (now - lastScrollTime >= scrollDelay) {
        lastScrollTime = now;

        // Decide whether we are scrolling up or down
        if (event.deltaY > 0) {
            smoothScrollInstance.scrollToSection("down");
        } else {
            smoothScrollInstance.scrollToSection("up");
        }
    }
}, { passive: false });

// Listen for click events on navigation links
const navLinks = document.querySelectorAll('.nav-btn');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor scroll behavior
        const targetId = link.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            smoothScrollInstance.targetScroll = targetElement.offsetTop; // Set the target scroll position to the clicked section
            smoothScrollInstance.vely = 0; // Reset velocity to avoid overshooting
            smoothScrollInstance.smoothScroll(); // Start smooth scrolling
        }
    });
});
