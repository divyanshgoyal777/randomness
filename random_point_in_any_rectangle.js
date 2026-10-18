const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function createRandomPoints(rec) {
    const points = [];

    for (let i = 0; i < 300; i++) {
        const randomX = Math.random() * rec.width + rec.x;
        const randomY = Math.random() * rec.height + rec.y;
        points.push({ randomX, randomY });
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

function update(world) {
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawRectangleLinesEx(world.rec, 5, r.BLACK);

    const WHITE = {
        r: 255,
        g: 255,
        b: 255,
        a: 150,
    }

    for (const points of world.randomPoints) {
        r.DrawCircle(points.randomX, points.randomY, 15, WHITE);
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