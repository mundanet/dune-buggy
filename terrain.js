// terrain.js
class Terrain {
    constructor() {
        // Cylinder visuals (terrain)
        const radius = 20; // Radius of the cylindrical terrain
        const height = 0.1; // Thickness of the terrain
        const segments = 64; // Number of segments for smooth cylinder

        // Create cylinder geometry and material
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x888888,
            map: new THREE.CanvasTexture(this.createStripes()), // Add a striped texture
            side: THREE.DoubleSide // Ensure both sides are visible
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / 2; // Lay the cylinder horizontally

        // Physics setup (still using a plane for collision)
        this.physicsBody = new CANNON.Body({ mass: 0 });
        this.physicsBody.addShape(new CANNON.Plane());
        this.physicsBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            -Math.PI / 2 // Align with Three.js coordinate system
        );
    }

    // Helper function to create a striped texture
    createStripes() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.fillStyle = '#777'; // Darker base color
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = '#666'; // Slightly lighter stripes
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(i * 10, 0, 1, 100); // Vertical stripes
        };
        return canvas;
    }

    getMesh() { return this.mesh; };
    getPhysicsBody() { return this.physicsBody; };
}
window.Terrain = Terrain;