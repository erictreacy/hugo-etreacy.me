class CssDoodle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.update();
    }

    update() {
        const style = document.createElement('style');
        const grid = this.parseGrid();
        
        style.textContent = `
            :host {
                display: block;
                visibility: visible;
                width: 100%;
                height: 100%;
                perspective: 1000px;
            }
            
            .container {
                display: grid;
                grid-template-columns: repeat(${grid.columns}, 1fr);
                width: ${grid.width};
                height: 100%;
                transform-style: preserve-3d;
                perspective-origin: calc(var(--mx, 50) * 1%) calc(var(--my, 50) * 1%);
            }
            
            .cell {
                width: 3px;
                height: 35vmin;
                margin: auto;
                background: var(--bg-color);
                transform: rotateY(var(--sy)) rotateZ(var(--sz));
                animation: r 75s linear infinite;
                transform-style: preserve-3d;
                transition: all 0.3s ease-out;
            }

            @keyframes r {
                to {
                    transform: rotateY(calc(var(--sy) + 360deg)) rotateZ(calc(var(--sz) + 360deg));
                }
            }

            @media (max-width: 600px) {
                .cell {
                    height: 28vmin;
                }
            }
        `;

        const container = document.createElement('div');
        container.className = 'container';
        
        // Primary blue color
        const colors = ['#2563eb'];

        for (let i = 0; i < grid.columns; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.setProperty('--sy', `${Math.floor(Math.random() * 720 - 360)}deg`);
            cell.style.setProperty('--sz', `${Math.floor(Math.random() * 720 - 360)}deg`);
            cell.style.setProperty('--bg-color', colors[Math.floor(Math.random() * colors.length)]);
            container.appendChild(cell);
        }

        // Update perspective origin on mousemove
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            container.style.setProperty('--mx', `${x}%`);
            container.style.setProperty('--my', `${y}%`);
        });

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
    }

    parseGrid() {
        const content = this.textContent;
        const gridMatch = content.match(/@grid:\s*(\d+)\s*\/\s*([^;]+)/);
        return {
            columns: gridMatch ? parseInt(gridMatch[1]) : 7,
            width: gridMatch ? gridMatch[2].trim() : '36vmin'
        };
    }
}

customElements.define('css-doodle', CssDoodle);
