class Block {
    constructor(id, text, hasCanvas = false, simulationType = 'particle') {
        this.id = id;
        this.text = text;
        this.hasCanvas = hasCanvas;
        this.simulationType = simulationType;
    }

    createElement() {
        const section = document.createElement("section");
        section.classList.add("block");
        section.id = this.id;
        
        const textCard = document.createElement("div");
        textCard.classList.add("text-card");
        textCard.innerText = this.text;
        
        section.appendChild(textCard);

        if (this.hasCanvas) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("background-canvas");
            section.appendChild(canvas);
            if (this.simulationType === 'particle') {
                this.initializeParticleSimulation(canvas);
            } else if (this.simulationType === 'matrix') {
                this.initializeMatrixEffect(canvas);
            }
        }

        return section;
    }

    initializeParticleSimulation(canvas) {
        new ParticleSimulation(canvas);
    }

    initializeMatrixEffect(canvas) {
        new MatrixEffect(canvas);
    }
}

const content = document.getElementById("content");

// Add the initial block for the portfolio introduction
const initialBlock = new Block("portfolio", "Kevin Dang's Portfolio", true, 'particle');
content.appendChild(initialBlock.createElement());

const blocks = [
    new Block("about", "About Me: Interactive Particle Simulation", true, 'particle'),
    new Block("experience", "Experience: Physics Particle Simulation", true, 'particle'),
    new Block("projects", "Projects: Gears Simulation", true, 'matrix')
];

blocks.forEach(block => content.appendChild(block.createElement()));

const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const target = document.getElementById(e.target.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});