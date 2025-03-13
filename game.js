// game.js
class Game {
    constructor() {
        this.buggy = new Buggy();
        this.terrain = new Terrain();
        this.physics = new Physics();
        this.renderer = new Renderer();

        // Add physics bodies
        this.physics.addBody(this.terrain.getPhysicsBody());
        this.physics.addBodies(this.buggy.getPhysicsBodies());

        // Add visuals to scene
        this.renderer.scene.add(this.buggy.getMesh());
        this.renderer.scene.add(this.terrain.getMesh());

        // Camera position
        this.renderer.camera.position.set(0, 5, 15);
        this.renderer.camera.lookAt(this.renderer.scene.position);

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.physics.step();
        this.syncPhysicsWithVisuals();
        this.renderer.render();
    }

    syncPhysicsWithVisuals() {
        // Update buggy chassis
        const chassisBody = this.buggy.chassisBody;
        this.buggy.chassisMesh.position.copy(new THREE.Vector3(
            chassisBody.position.x,
            chassisBody.position.y,
            chassisBody.position.z
        ));

        // Update wheel
        const wheelBody = this.buggy.wheelBody;
        this.buggy.wheelMesh.position.copy(new THREE.Vector3(
            wheelBody.position.x,
            wheelBody.position.y,
            wheelBody.position.z
        ));
    }
}

new Game();