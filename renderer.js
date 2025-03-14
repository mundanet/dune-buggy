// renderer.js
class Renderer {
    constructor() {
        console.log("Initializing Renderer...");
        this.canvas = document.getElementById('myCanvas');
        if (!this.canvas) {
            console.error("Canvas element not found!");
            return;
        }
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        console.log("Renderer initialized. Canvas size:", this.canvas.width, this.canvas.height);
    }

    render() {
        console.log("Rendering frame...");
        this.renderer.render(this.scene, this.camera);
    }
}
window.Renderer = Renderer;