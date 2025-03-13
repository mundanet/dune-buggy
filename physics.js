// physics.js
class Physics {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.bodies = [];
    }

    addBody(body) {
        this.world.addBody(body);
        this.bodies.push(body);
    }

    addBodies(bodies) {
        bodies.forEach(body => this.addBody(body));
    }

    step() {
        this.world.step(1 / 60);
    }
}
window.Physics = Physics;