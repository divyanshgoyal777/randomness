const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(width, height, x, y) {
    const randomX = Math.random() * width + x;
    const randomY = Math.random() * height + y;
    return { x: randomX, y: randomY }
}

function createRandomPoints(rec) {
    const points = [];

    for (let i = 0; i < 300; i++) {
        const randomPoints = generateRandom(rec.width, rec.height, rec.x, rec.y)
        points.push({ x: randomPoints.x, y: randomPoints.y });
    }

    return points;
}

function setup() {
    const world = {
        height: 800,
        width: 800,
        rec: {
            x: 100,
            y: 200,
            width: 500,
            height: 500,
        }
    }

    world.randomPoints = createRandomPoints(world.rec);

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

    r.DrawRectangleLinesEx(world.rec, 5, r.BLACK);
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