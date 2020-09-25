const IMAGES = [
    "resources/fair.png" // TODO: times 4
    ,"resources/fair2.png" // TODO: times 5
    ,"resources/headwind.png"
    ,"resources/tailwind.png"
    ,"resources/crosswind.png"
    ,"resources/wet.png"
];
const ROUNDS = 1; // Amount of rounds the carousel will shift trough
const CAROUSEL_TIME = 5; // Total time in seconds carousel will spin

function pickRandomImage() {
    if (!IMAGES.length) {
        $("#information-text").html("No images left");
        $("#random-image").html("");
    } else {
        selected = Math.floor(Math.random() * IMAGES.length); // Pick random image
        const totalCarousel = ROUNDS * IMAGES.length + selected; // Total images that will be shown in carousel
        let durations = computeDurations(totalCarousel); // Compute a list of durations for each image display in the carousel
        doCarousel(0, durations);
    }
}

function doCarousel(index, durations) {
    index = index % IMAGES.length;
    if (durations.length > 0) {
        data = `<img class="img-thumbnail random-image" src="` + IMAGES[index] + `">`;
        $("#random-image").html(data);
        const duration = durations.shift();
        setTimeout(function() {
            doCarousel(index + 1, durations);
        }, duration * 1000);
    } else {
        // Freeze and remove image from list
        data = `<img class="img-thumbnail random-image" src="` + IMAGES[index] + `">`;
        $("#random-image").html(data);
        IMAGES.splice(index, 1);
    }
}

function computeDurations(steps) {
    const times = [];
    for (let i = steps; i > 0; i -= 1) {
        times.push(f(i, steps));
    }
    return times;
}

/**
 * Some beautiful math to create a increasing-time effect in the carousel spin
 */
function f(x, steps) {
    const carousel_time = Math.min(CAROUSEL_TIME, IMAGES.length);
    sigm = 0;
    for (let i = 1; i <= steps; i += 1) {
        sigm += Math.log(i);
    }
    a = CAROUSEL_TIME / (steps * Math.log(steps) - sigm)
    c = (CAROUSEL_TIME * Math.log(steps)) / (steps * Math.log(steps) - sigm);
    return -a * Math.log(x) + c;
}

function reset() {
    // TODO
    console.warn("Not yet implemented, you fool.")
}
