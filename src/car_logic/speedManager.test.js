import { speedUp, slowDown } from "./speedManager";

const cases = [1, 50, 250];

for (let i = 0; i < cases.length; i++) {
    const distancePx = cases[i];

    const speedUpValue = speedUp(distancePx).reduce(
        (total, num) => total + num
    );
    const slowDownValue = slowDown(distancePx).reduce(
        (total, num) => total + num
    );

    test("speedManager speedUp case " + i, () => {
        expect(speedUpValue).toBeGreaterThan(distancePx - 1);
        expect(speedUpValue).toBeLessThan(distancePx + 1);
    });

    test("speedManager slowDown case " + i, () => {
        expect(slowDownValue).toBeGreaterThan(distancePx - 1);
        expect(slowDownValue).toBeLessThan(distancePx + 1);
    });

    test("speedManager slowDown case " + i, () => {
        expect(
            slowDown(distancePx).length - speedUp(distancePx).length
        ).toBeLessThan(33);
    });
}
