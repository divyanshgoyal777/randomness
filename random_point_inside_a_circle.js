const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function convertToRadians(degree) {
    return degree * Math.PI / 180;
}

function createRandomPoints(world) {
    const points = [];

    for (let i = 0; i < 800; i++) {

        const r = Math.sqrt(Math.random()) * world.circleRadius;
        const angle = convertToRadians(Math.random() * 360);
        const randomX = r * Math.cos(angle) + world.circleX;
        const randomY = r * Math.sin(angle) + world.circleY;

        points.push({ randomX, randomY });
    }

    return points;
}

function setup() {

    const world = {
        height: 800,
        width: 800,
        circleX: 0,
        circleY: 0,
        circleRadius: 400,
    }

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random");
    r.SetTargetFPS(60);

    return world;
}

function update(world) {
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawCircleLines(world.circleX, world.circleY, world.circleRadius, r.WHITE);

    const YELLOW = {
        r: 253,
        g: 249,
        b: 0,
        a: 200,
    }

    for (const points of world.randomPoints) {
        r.DrawCircle(points.randomX, points.randomY, 7, YELLOW);
    }

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