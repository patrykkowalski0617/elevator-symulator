import theNearestCar, { distanceToAvailableCars } from "./theNearestCar";

const cases = [
    {
        allCarsState: ["ready", "ready"],
        allCarsCurrentFloor: [0, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ],
        expectedByTheNearestCar: 0
    },
    {
        allCarsState: ["ready", "ready", null],
        allCarsCurrentFloor: [0, 0, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ],
        expectedByTheNearestCar: 0
    },
    {
        allCarsState: ["ready", "ready", null],
        allCarsCurrentFloor: [0, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [],
        expectedByTheNearestCar: null
    },
    {
        allCarsState: [],
        allCarsCurrentFloor: [],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [],
        expectedByTheNearestCar: null
    },
    {
        allCarsState: [],
        allCarsCurrentFloor: [0, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [],
        expectedByTheNearestCar: null
    },
    {
        allCarsState: ["go-up", "ready"],
        allCarsCurrentFloor: [0, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 4 }
        ],
        expectedByTheNearestCar: 0
    },
    {
        allCarsState: ["go-up", "ready"],
        allCarsCurrentFloor: [3, 0],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [{ carId: 1, distance: 4 }],
        expectedByTheNearestCar: 1
    },
    {
        allCarsState: ["go-down", "go-up"],
        allCarsCurrentFloor: [1, 1],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [{ carId: 1, distance: 3 }],
        expectedByTheNearestCar: 1
    },
    {
        allCarsState: ["go-up", "go-down"],
        allCarsCurrentFloor: [0, 6],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [
            { carId: 0, distance: 4 },
            { carId: 1, distance: 2 }
        ],
        expectedByTheNearestCar: 1
    },
    {
        allCarsState: ["go-up", "go-down"],
        allCarsCurrentFloor: [0, 5],
        floorNumber: 4,
        expectedByDistanceToAvailableCars: [{ carId: 0, distance: 4 }],
        expectedByTheNearestCar: 0
    }
];

for (let i = 0; i < cases.length; i++) {
    const {
        allCarsState,
        allCarsCurrentFloor,
        floorNumber,
        expectedByDistanceToAvailableCars
    } = cases[i];

    test("case " + i, () => {
        expect(
            distanceToAvailableCars(
                allCarsState,
                allCarsCurrentFloor,
                floorNumber
            )
        ).toEqual(expectedByDistanceToAvailableCars);
    });
}

for (let i = 0; i < cases.length; i++) {
    const {
        allCarsState,
        allCarsCurrentFloor,
        floorNumber,
        expectedByTheNearestCar
    } = cases[i];

    test("case " + i, () => {
        const expected = theNearestCar(
            allCarsState,
            allCarsCurrentFloor,
            floorNumber
        );

        expect(expected).toEqual(expectedByTheNearestCar);
    });
}
