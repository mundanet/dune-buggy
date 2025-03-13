// terrain.js
class Terrain {
    constructor() {
        // Visuals
        this.geometry = new THREE.PlaneGeometry(20, 20);
        this.material = new THREE.MeshBasicMaterial({ color: 0x888888 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;

        // Physics
        this.physicsBody = new CANNON.Body({ mass: 0 });
        this.physicsBody.addShape(new CANNON.Plane());
        this.physicsBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    }

    getMesh() { return this.mesh; }
    getPhysicsBody() { return this.physicsBody; }
}
window.Terrain = Terrain;