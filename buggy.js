// buggy.js
class Buggy {
    constructor() {
        // Visuals
        this.chassisGeometry = new THREE.BoxGeometry(4, 0.5, 2);
        this.chassisMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        this.chassisMesh = new THREE.Mesh(this.chassisGeometry, this.chassisMaterial);

        // Physics
        this.chassisBody = new CANNON.Body({
            mass: 50,
            position: new CANNON.Vec3(0, 1, 0) // Start above ground
        });
        this.chassisBody.addShape(new CANNON.Box(new CANNON.Vec3(2, 0.25, 1)));

        // Wheel (simplified for testing)
        this.wheelRadius = 0.5;
        this.wheelHeight = 0.2;
        this.wheelBody = new CANNON.Body({
            mass: 5,
            position: new CANNON.Vec3(1.8, 0.5, 0)
        });
        this.wheelBody.addShape(new CANNON.Cylinder(this.wheelRadius, this.wheelRadius, this.wheelHeight, 4));

        // Wheel visual
        this.wheelMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(this.wheelRadius, this.wheelRadius, this.wheelHeight, 16),
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
        );
    }

    getMesh() {
        const group = new THREE.Group();
        group.add(this.chassisMesh);
        group.add(this.wheelMesh);
        return group;
    }

    getPhysicsBodies() {
        return [this.chassisBody, this.wheelBody];
    }
}
window.Buggy = Buggy;