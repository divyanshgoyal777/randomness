
const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandom(max) {
    const a = Math.random();
    const b = Math.random();
    const c = Math.random();

    return ((a + b + c) / 3) * max;
}

function createRandomPoints(world) {
    const points = [];

    for (let i = 0; i < 200; i++) {
        const x = generateRandom(world.width);
        const y = Math.random() * world.height;

        points.push({ x, y });
    }

    return points;
}

function countPoints(start, end, increment, world) {
    let count = 0;
    let sum = 0;

    for (let i = 0; i < world.randomPoints.length; i++) {
        if (world.randomPoints[i].x >= start && world.randomPoints[i].x <= end) {
            count++
            sum += world.randomPoints[i].x
        };
    }

    return {
        start,
        end,
        frequency: count,
        avg: sum / count,
        y: world.height - (world.height * (count / increment)),
    }
}

function frequencyOfPoints(world) {
    const increment = world.width / 10;
    const freqOfPoints = [];
    let end = 0;

    for (let start = 0; start <= world.width - increment; start += increment) {
        end += increment;
        const frequency = countPoints(start, end, increment, world);
        freqOfPoints.push(frequency);
    }

    return freqOfPoints;
}

function setup() {
    const world = {
        width: 1000,
        height: 800,
    };

    world.randomPoints = createRandomPoints(world);
    world.freqOfPoints = frequencyOfPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random Distributions");
    r.SetTargetFPS(60);

    return world;
}

function update() { }

function drawLine(world) {
    for (let i = 0; i < world.randomPoints.length; i++) {
        r.DrawLine(world.randomPoints[i].x, 0, world.randomPoints[i].x, world.height, r.WHITE);
    }
}

function drawPoints(world) {
    for (let i = 0; i < world.freqOfPoints.length; i++) {
        r.DrawCircle(world.freqOfPoints[i].avg, world.freqOfPoints[i].y, 5, r.RED);
    }
}

function connectPoints(world) {
    for (let i = 0; i < world.freqOfPoints.length - 1; i++) {
        r.DrawLineEx(
            { x: world.freqOfPoints[i].avg, y: world.freqOfPoints[i].y },
            { x: world.freqOfPoints[i + 1].avg, y: world.freqOfPoints[i + 1].y },
            3,
            r.RED
        );
    }
}


function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawLine(world)
    drawPoints(world);
    connectPoints(world);

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
