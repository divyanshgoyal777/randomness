const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(800, 800, "Random");
    r.SetTargetFPS(60);
}

function update(world) { }

function generateRandom(x) {
    return Math.random() * x;
}

function createRandomLines(x) {
    for (let i = 0; i < 50; i++) {
        const randomX = generateRandom(x);
        r.DrawLineEx({ x: randomX, y: 0 }, { x: randomX, y: 800 }, 2, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    createRandomLines(800);

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