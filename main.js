// const sketch = require("./random_between_0_and_x");
// const sketch = require("./random_between_x1_and_x2");
// const sketch = require("./random_point_in_rectangle");
const sketch = require("./random_point_in_any_rectangle");


function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
}

main();