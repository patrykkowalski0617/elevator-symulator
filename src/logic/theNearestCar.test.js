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
    const [distances, expected] = cases[i];

    const distanceToAvailableCars = jest.fn(() => distances);

    test("case " + i, () => {
        expect(theNearestCar(distanceToAvailableCars())).toEqual(expected);
        expect(distanceToAvailableCars).toHaveBeenCalledTimes(1);
    });
}
