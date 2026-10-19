const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(x, y) {
    const randomX = Math.random() * x;
    const randomY = Math.random() * y;
    return { x: randomX, y: randomY }
}

function createRandomPoints(w) {
    const points = [];

    for (let i = 0; i < 1000; i++) {
        const randomPoints = generateRandom(w.width, w.height)
        points.push({ x: randomPoints.x, y: randomPoints.y });
    }

    return points;
}

function setup() {
    const world = {
        height: 800,
        width: 800,
    }

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function getWhiteColor() {
    return {
        r: 255,
        g: 255,
        b: 255,
        a: 150,
    };
}

function drawPoints(points) {
    for (const point of points) {
        r.DrawCircle(point.x, point.y, 15, getWhiteColor());
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