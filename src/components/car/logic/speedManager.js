import Easing from "easing";

// solution is not proper (but works)
// rel = frames / distance (avarage relation frames to got distance)
// for example:
// const frames = 50
// const distance = Easing(frames, "quadratic").reduce((total, num) => total + num)
// frames / distance usually is equal around 2.99031970597443

export const speedUp = distancePx => {
    const rel = 2.99031970597443;
    const frames = Math.round(distancePx * rel);
    const easing = Easing(frames, "quadratic");
    // returned array two times longer than slowDown easing
    let halfOfEasing = [];

    for (var i = 0; i < easing.length; i += 2) {
        const sum = easing[i] + easing[i + 1];
        if (sum) {
            halfOfEasing.push(sum);
        }
    }
    return halfOfEasing;
};

export const slowDown = distancePx => {
    const rel = 1.5752095205544;
    const frames = Math.round(distancePx * rel);
    const easing = Easing(frames, "sinusoidal");

    return easing.reverse();
};
