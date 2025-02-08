class Block {
    constructor(id, title, hasEffect, effectType) {
        this.id = id;
        this.title = title;
        this.hasEffect = hasEffect;
        this.effectType = effectType;
    }

    createElement() {
        const block = document.createElement("div");
        block.classList.add("block");
        block.id = this.id;

        const textCard = document.createElement("div");
        textCard.classList.add("text-card");
        textCard.textContent = this.title;
        block.appendChild(textCard);

        if (this.hasEffect) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("background-canvas", this.effectType);
            block.appendChild(canvas);

            // Initialize the effect after adding the canvas
            requestAnimationFrame(() => this.initEffect(canvas));
        }

        return block;
    }

    initEffect(canvas) {
        if (this.effectType === "particle") {
            initParticleEffect(canvas);
        } else if (this.effectType === "matrix") {
            initMatrixEffect(canvas);
        } else if (this.effectType === "gears") {
            initGearsEffect(canvas);
        }
    }
}


const content = document.getElementById("content");

// Initial block for portfolio introduction
const initialBlock = new Block("portfolio", "Welcome to Kevin Dang’s Portfolio", true, 'particle');
content.appendChild(initialBlock.createElement());

const blocks = [
    new Block("about", "About Me: Interactive Water Simulation", true, 'particle'),
    new Block("experience", "Experience: Physics Particle Simulation", true, 'particle'),
    new Block("projects", "Projects: Gears Simulation", true, 'matrix')
];

blocks.forEach(block => content.appendChild(block.createElement()));

// Smooth scroll for navigation buttons
document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const target = document.getElementById(e.target.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Scroll detection to add a Matrix Effect block
let matrixBlockAdded = false;
const handleScroll = () => {
    if (!matrixBlockAdded && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
        addNewMatrixBlock();
    }
};
window.addEventListener("scroll", handleScroll);

// Cleanup scroll listener when needed
// window.removeEventListener("scroll", handleScroll);

function addNewMatrixBlock() {
    const newBlock = new Block("matrix-section", "New Matrix Effect Block", true, 'matrix');
    content.appendChild(newBlock.createElement());
    matrixBlockAdded = true;
}
