const IMAGES_METEO = [
    "resources/fair.png" // TODO: times 4
    ,"resources/fair2.png" // TODO: times 5
    ,"resources/headwind.png"
    ,"resources/tailwind.png"
    ,"resources/crosswind.png"
    ,"resources/wet.png"
];
const ROUNDS = 1; // Amount of rounds the carousel will shift trough
const CAROUSEL_TIME = 5; // Total time in seconds carousel will spin
let images = IMAGES_METEO;

function pickRandomImage() {
    $("#reset-button").prop('disabled', false);
    $("#pick-button").prop('disabled', true);
    if (!images.length) {
        $("#information-text").html("No images left");
        $("#random-image").html("");
    } else {
        let selected = Math.floor(Math.random() * images.length); // Pick random image
        const totalCarousel = ROUNDS * images.length + selected; // Total images that will be shown in carousel
        let durations = computeDurations(totalCarousel); // Compute a list of durations for each image display in the carousel
        doCarousel(0, durations);
    }
}

function doCarousel(index, durations) {
    index = index % images.length;
    if (durations.length > 0) {
        let data = `<img class="img-thumbnail random-image" src="` + images[index] + `">`;
        $("#random-image").html(data);
        const duration = durations.shift();
        setTimeout(function() {
            doCarousel(index + 1, durations);
        }, duration * 1000);
    } else {
        // Freeze and remove image from list
        let data = `<img class="img-thumbnail random-image" src="` + images[index] + `">`;
        $("#random-image").html(data);
        images.splice(index, 1);
        $("#pick-button").prop('disabled', false);
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
    // const carousel_time = Math.min(CAROUSEL_TIME, images.length);
    let sigm = 0;
    for (let i = 1; i <= steps; i += 1) {
        sigm += Math.log(i);
    }
    a = CAROUSEL_TIME / (steps * Math.log(steps) - sigm)
    c = (CAROUSEL_TIME * Math.log(steps)) / (steps * Math.log(steps) - sigm);
    return -a * Math.log(x) + c;
}

function reset() {
    images = IMAGES_METEO;
    $("#reset-button").prop('disabled', true);
}
