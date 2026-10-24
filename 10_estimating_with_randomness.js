const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(width, height, x, y) {
    const randomX = Math.random() * width + x;
    const randomY = Math.random() * height + y;
    return { x: randomX, y: randomY }
}

function createRandomPoints(square) {
    const points = [];

    for (let i = 0; i < 1000; i++) {
        const randomPoints = generateRandom(square.width, square.height, square.x, square.y)
        points.push({ x: randomPoints.x, y: randomPoints.y });
    }

    return points;
}

function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function isInsideCircle(point, circle) {
    const distanceFromPoint = distanceBetween(point.x, point.y, circle.x, circle.y);
    return distanceFromPoint < circle.radius;
}

function countPointsInsideCircle(world) {
    let count = 0;

    for (let i = 0; i < world.randomPoints.length; i++) {
        if (isInsideCircle(world.randomPoints[i], world.circle)) {
            count++;
        }
    }

    return count;
}

function setup() {
    const world = {
        height: 800,
        width: 800,
        square: {
            x: 150,
            y: 150,
            width: 500,
            height: 500,
        },
        circle: {
            x: 400,
            y: 400,
            radius: 200,
        }
    }

    world.randomPoints = createRandomPoints(world.square);
    world.pointsInsideCircle = countPointsInsideCircle(world);

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
        r.DrawCircle(point.x, point.y, 2, getWhiteColor());
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawRectangleLinesEx(world.square, 2, r.BLACK);
    r.DrawCircleLines(world.circle.x, world.circle.y, world.circle.radius, r.BLACK);
    drawPoints(world.randomPoints);

    const areaOfSquare = world.square.width * world.square.height;
    const areaOfCircle = (world.pointsInsideCircle / world.randomPoints.length) * areaOfSquare;
    console.log(areaOfCircle);

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