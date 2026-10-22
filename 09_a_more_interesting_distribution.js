
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

    for (let i = 0; i < 100; i++) {
        const x = generateRandom(world.width);
        const y = Math.random() * world.height;

        points.push({ x, y });
    }

    return points;
}

function drawLine(world) {
    for (let i = 0; i < world.randomPoints.length; i++) {
        r.DrawLine(world.randomPoints[i].x, 0, world.randomPoints[i].x, world.height, r.WHITE);
    }
}

function setup() {
    const world = {
        width: 1000,
        height: 800,
    };

    world.randomPoints = createRandomPoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.width, world.height, "Random Distributions");
    r.SetTargetFPS(60);

    return world;
}

function update(world) { }

function countPoints(start, end, world) {
    let count = 0;
    for (let i = 0; i < world.randomPoints.length; i++) {
        if (world.randomPoints[i].x >= start && world.randomPoints[i].x <= end) count++;
    }
    return {
        start, end, frequency: count,
    }
}

function frequencyOfPoints(world) {
    const increment = world.width / 10;
    const freqOfPoints = [];
    let end = 0;
    for (let start = 0; start <= world.width - increment; start += increment) {
        end += increment;
        const frequency = countPoints(start, end, world);
        freqOfPoints.push(frequency);
    }

    return freqOfPoints;
}

function avgOfPoints(world) {
    const freqOfPoints = frequencyOfPoints(world);
    for (let i = 0; i < freqOfPoints.length; i++) {
        for (let j = 0; j < freqOfPoints[i].frequency; j++) {

        }
    }
}


function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    // drawPoints(world.randomPoints);
    drawLine(world)
    frequencyOfPoints(world);
    // connectPoints();

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
