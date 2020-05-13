import { speedUp, slowDown } from "./speedManager";

const cases = [1, 50, 255];

for (let i = 0; i < cases.length; i++) {
    const distancePx = cases[i];

    test("speedManager speedUp case " + i, () => {
        const value = speedUp(distancePx).reduce((total, num) => total + num);
        expect(value).toBeGreaterThan(distancePx - 1);
        expect(value).toBeLessThan(distancePx + 1);
    });

    test("speedManager slowDown case " + i, () => {
        const value = slowDown(distancePx).reduce((total, num) => total + num);
        expect(value).toBeGreaterThan(distancePx - 1);
        expect(value).toBeLessThan(distancePx + 1);
    });
}
