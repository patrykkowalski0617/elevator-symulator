import assignFloorToCar from "./assignFloorToCar";

test("case 1", () => {
    expect(assignFloorToCar(["ready", "ready"], [0, 0], 4)).toEqual(0);
});

test("case 2", () => {
    expect(assignFloorToCar(["go-up", "ready"], [0, 0], 4)).toEqual(0);
});

test("case 3", () => {
    expect(assignFloorToCar(["ready", "go-up"], [0, 0], 4)).toEqual(1);
});

test("case 4", () => {
    expect(assignFloorToCar(["go-up", "go-up"], [0, 0], 4)).toEqual(0);
});
