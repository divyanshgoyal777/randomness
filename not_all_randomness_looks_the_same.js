
const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(max) {
    const a = Math.random();
    const b = Math.random();
    const c = Math.random();

    return ((a + b + c) / 3) * max;
}

// function generateRandom(max) {
//     return Math.random() * max;
// }

// function generateRandom(max) {
//     return Math.random() * Math.random() * max;
// }

// function generateRandom(max) {
//     return (1 - Math.random() * Math.random()) * max;
// }

// function generateRandom(max) {
//     // const x = Math.random() * max;
//     // const y = Math.random() * max;
//     // return (x + y) / 2;

//     return Math.random() * max;
// }

function createRandomPoints(world) {
    const points = [];

    for (let i = 0; i < 800; i++) {
        const x = generateRandom(world.width);
        const y = Math.random() * world.height;

        points.push({ x, y });
    }

    return points;
}

function setup() {
    const world = {
        width: 800,
        height: 800,
    };

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random Distributions");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function drawPoints(points) {
    for (const point of points) {
        r.DrawCircle(
            point.x,
            point.y,
            3,
            { r: 253, g: 249, b: 0, a: 200 }
        );
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawPoints(world.randomPoints);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
