const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(800, 800, "Random");
    r.SetTargetFPS(60);
}

function update(world) {
}

function createRandomLines(x1, x2) {
    for (let i = 0; i < 50; i++) {
        const randomX = (Math.random() * (x2 - x1)) + x1;
        r.DrawLineEx({ x: randomX, y: 0 }, { x: randomX, y: 800 }, 2, r.WHITE);
    }
}


function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    createRandomLines(300, 570);

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