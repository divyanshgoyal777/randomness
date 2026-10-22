const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const world = {
        height: 800,
        width: 800,
        p1: {
            x: 200, y: 200,
        },
        v1: {
            width: 300,
            angle: 0,
        },
        v2: {
            height: 200,
            angle: 110
        }
    }

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function calcBase(height, angle) {
    return height / Math.tan(angle * Math.PI / 180);
}

function generateRandomHeight(height) {
    return Math.random() * height;
}

function generateRandomX(width, x, base) {
    return Math.random() * width + x + base
}

function createRandomPoints(world) {
    const points = [];

    for (let i = 0; i < 200; i++) {
        const height = generateRandomHeight(world.v2.height);
        const base = calcBase(height, world.v2.angle);
        const randomX = generateRandomX(world.v1.width, world.p1.x, base);
        const randomY = world.p1.y + height;

        points.push({ x: randomX, y: randomY });
    }

    return points;
}

function drawParallelogram(w) {
    const pg = {
        p1: { x: w.p1.x, y: w.p1.y },
        p2: { x: w.p1.x + w.v1.width, y: w.p1.y },
        p3: { y: w.p1.y + w.v2.height },
        p4: { y: w.p1.y + w.v2.height },
    }

    const angle = 180 - w.v2.angle;
    const base = calcBase(w.v2.height, angle);

    pg.p3.x = pg.p2.x - base;
    pg.p4.x = pg.p1.x - base;

    r.DrawLineEx({ x: pg.p1.x, y: pg.p1.y }, { x: pg.p2.x, y: pg.p2.y }, 5, r.BLACK);
    r.DrawLineEx({ x: pg.p3.x, y: pg.p3.y }, { x: pg.p4.x, y: pg.p4.y }, 5, r.BLACK);
    r.DrawLineEx({ x: pg.p2.x, y: pg.p2.y }, { x: pg.p3.x, y: pg.p3.y }, 5, r.BLACK);
    r.DrawLineEx({ x: pg.p4.x, y: pg.p4.y }, { x: pg.p1.x, y: pg.p1.y }, 5, r.BLACK);
}

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
        r.DrawCircle(point.x, point.y, 10, getYellowColor());
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawParallelogram(world);
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