class Game {
    constructor() {
        this.buggy = new Buggy();
        this.terrain = new Terrain();
        this.physics = new Physics();
        this.renderer = new Renderer();
        this.controls = new Controls();

        // Add physics bodies
        this.physics.addBody(this.terrain.getPhysicsBody());
        this.physics.addBodies(this.buggy.getPhysicsBodies());

        // Add visuals to scene
        this.renderer.scene.add(this.buggy.getMesh());
        this.renderer.scene.add(this.terrain.getMesh());

        // Camera setup
        this.renderer.camera.position.set(0, 5, 15);
        this.cameraFollowSpeed = 0.05;

        this.lastTime = 0;
        this.rotationSpeed = 0.1; // Increased rotation speed
        this.acceleration = 10; // Strong acceleration
        this.torque = 0.5;

        this.animate();
    }

    animate(timestamp) {
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        requestAnimationFrame(this.animate.bind(this));
        this.physics.step();
        this.applyControls(delta);
        this.syncPhysicsWithVisuals();
        this.renderer.render();
        this.rotateTerrain(delta);
        this.updateCamera(delta);
    }

    applyControls(delta) {
        const { buggy, controls } = this;
        const chassis = buggy.chassisBody;
        const force = new CANNON.Vec3();

        // Acceleration/Braking
        if (controls.isAccelerating) {
            const forward = new CANNON.Vec3(0, 0, 1);
            chassis.quaternion.vmult(forward, forward); // Get world forward direction
            force.copy(chassis.force);
            const accelerationVec = forward.scale(this.acceleration);
            force.vadd(accelerationVec, force);
        } else if (controls.isBraking) {
            force.copy(chassis.force);
            force.scale(-0.1);
        } else {
            force.copy(chassis.force); // Reset to current force
        }

        // Turning (using torque property)
        if (controls.isTurningLeft) {
            chassis.torque.y = -this.torque;
        } else if (controls.isTurningRight) {
            chassis.torque.y = this.torque;
        } else {
            chassis.torque.y = 0;
        }

        chassis.force.copy(force);
    }

    rotateTerrain(delta) {
        const { terrain } = this;
        const velocityZ = this.buggy.chassisBody.velocity.z;
        terrain.mesh.rotation.y -= velocityZ * this.rotationSpeed * delta;
    }

    syncPhysicsWithVisuals() {
        const { buggy, terrain } = this;
        const chassis = buggy.chassisBody;
        const chassisMesh = buggy.chassisMesh;

        // Sync chassis position and rotation
        chassisMesh.position.copy(new THREE.Vector3(
            chassis.position.x,
            chassis.position.y,
            chassis.position.z
        ));
        chassisMesh.quaternion.copy(chassis.quaternion);

        // Sync wheel position (simplified)
        const wheelBody = buggy.wheelBody;
        buggy.wheelMesh.position.copy(new THREE.Vector3(
            wheelBody.position.x,
            wheelBody.position.y,
            wheelBody.position.z
        ));
    }

    updateCamera(delta) {
        const chassis = this.buggy.chassisBody;
        const targetPosition = new THREE.Vector3(
            chassis.position.x,
            chassis.position.y + 2, // Elevate the camera
            chassis.position.z - 10 // Offset behind the buggy
        );

        // Smoothly interpolate camera position
        this.renderer.camera.position.lerp(targetPosition, this.cameraFollowSpeed);
        this.renderer.camera.lookAt(chassis.position);
    }
}

new Game();