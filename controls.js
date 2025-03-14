class Controls {
    constructor() {
        this.keys = {};
        document.addEventListener('keydown', (e) => this.keys[e.key] = true);
        document.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    get isAccelerating() { return this.keys['ArrowUp'] }
    get isBraking() { return this.keys['ArrowDown'] }
    get isTurningLeft() { return this.keys['ArrowLeft'] }
    get isTurningRight() { return this.keys['ArrowRight'] }
}

window.Controls = Controls;