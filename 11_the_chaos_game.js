const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(max) {
    return Math.floor(Math.random() * max);
}

function calcMidPoint(v1, v2) {
    const x = (v1.x + v2.x) / 2;
    const y = (v1.y + v2.y) / 2;
    return { x, y };
}

function getSierpinskiPoints(triangle, startingPoint, totalPoints) {
    const points = [];

    for (let i = 0; i < totalPoints; i++) {
        const side = generateRandom(3);
        const midPoint = calcMidPoint(triangle[side], startingPoint);
        points.push(midPoint);
        startingPoint = midPoint;
    }

    return points;
}

function setup() {
    const world = {
        height: 800,
        width: 800,
        triangle: {
            0: { x: 100, y: 600 },
            1: { x: 400, y: 100 },
            2: { x: 700, y: 600 },
        },
        startingPoint: {
            x: 550,
            y: 400,
        },
        totalPoints: 100000,
    }

    world.points = getSierpinskiPoints(world.triangle, world.startingPoint, world.totalPoints);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function drawPoints(points) {
    for (const point of points) {
        r.DrawCircle(point.x, point.y, 2, r.RED);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawTriangleLines(world.triangle[0], world.triangle[1], world.triangle[2], r.WHITE);
    drawPoints(world.points);

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