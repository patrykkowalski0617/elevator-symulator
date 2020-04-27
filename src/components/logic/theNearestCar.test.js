import theNearestCar from "./theNearestCar";

const cases = [
    [
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ],
        0
    ],
    [
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 2 }
        ],
        1
    ]
];

for (let i = 0; i < cases.length; i++) {
    const [distanceToAvailableCars, expectedReturn] = cases[i];
    test("case " + i, () => {
        expect(theNearestCar(distanceToAvailableCars)).toEqual(expectedReturn);
    });
}
