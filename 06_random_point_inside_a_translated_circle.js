const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(x) {
    return Math.sqrt(Math.random()) * x;
}

function convertToRadians(degree) {
    return degree * Math.PI / 180;
}

function createRandomPoints(world) {
    const points = [];

    for (let i = 0; i < 800; i++) {

        const r = generateRandom(world.circleRadius);
        const angle = convertToRadians(Math.random() * 360);
        const randomX = r * Math.cos(angle) + world.circleX;
        const randomY = r * Math.sin(angle) + world.circleY;

        points.push({ x: randomX, y: randomY });
    }

    return points;
}

function setup() {
    const world = {
        height: 800,
        width: 800,
        circleX: 400,
        circleY: 400,
        circleRadius: 200,
    }

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function getYellowColor() {
    return {
        r: 253,
        g: 249,
        b: 0,
        a: 200,
    };
}

function drawPoints(points) {
    for (const point of points) {
        r.DrawCircle(point.x, point.y, 15, getYellowColor());
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawCircleLines(world.circleX, world.circleY, world.circleRadius, r.WHITE);
    drawPoints(world.randomPoints)

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