import distanceToAvailableCars from "./distanceToAvailableCars";

const cases = [
    [
        ["ready", "ready"],
        [0, 0],
        4,
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ]
    ],
    [
        ["ready", "ready", null],
        [0, 0, 0],
        4,
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ]
    ],
    [["ready", "ready", null], [0, 0], 4, []],
    [[], [], 4, []],
    [[], [0, 0], 4, []],
    [
        ["go-up", "ready"],
        [0, 0],
        4,
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ]
    ],
    [["go-up", "ready"], [3, 0], 4, [{ carId: 1, distance: 4 }]],
    [["go-down", "go-up"], [1, 1], 4, [{ carId: 1, distance: 3 }]],
    [
        ["go-up", "go-down"],
        [0, 6],
        4,
        [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 2 }
        ]
    ],
    [["go-up", "go-down"], [0, 5], 4, [{ carId: 0, distance: 4 }]]
];

for (let i = 0; i < cases.length; i++) {
    const [
        allCarsState,
        allCarsCurrentFloor,
        floorNumber,
        expectedReturn
    ] = cases[i];
    test("case " + i, () => {
        expect(
            distanceToAvailableCars(
                allCarsState,
                allCarsCurrentFloor,
                floorNumber
            )
        ).toEqual(expectedReturn);
    });
}
