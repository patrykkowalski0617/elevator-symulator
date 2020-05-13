import Easing from "easing";

// solution is not proper, but works
// rel = frames / distance (avarage relation frames to got distance)
// for example:
// const frames = 50
// const distance = Easing(frames, "quadratic").reduce((total, num) => total + num)
// frames / distance usually is equal to around 2.99031970597443

export const speedUp = distancePx => {
    const rel = 2.99031970597443;
    const frames = Math.round(distancePx * rel);
    const easing = Easing(frames, "quadratic");
    // returned array is too long
    let halfOfEasing = [];

    for (var i = 0; i < easing.length; i++) {
        halfOfEasing.push(easing[i]);
    }

    return easing;
};

export const slowDown = distancePx => {
    const rel = 1.5752095205544;
    const frames = Math.round(distancePx * rel);
    const easing = Easing(frames, "sinusoidal");

    return easing.reverse();
};
