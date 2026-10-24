// const sketch = require("./01_random_between_0_and_x");
// const sketch = require("./02_random_between_x1_and_x2");
// const sketch = require("./03_random_point_in_rectangle");
// const sketch = require("./04_random_point_in_any_rectangle");
// const sketch = require("./05_random_point_inside_a_circle");
// const sketch = require("./06random_point_inside_a_translated_circle");
// const sketch = require("./07random_point_inside_a_parallelogram")
// const sketch = require("./08_not_all_randomness_looks_the_same")
// const sketch = require("./09_a_more_interesting_distribution");
const sketch = require("./10_estimating_with_randomness");

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