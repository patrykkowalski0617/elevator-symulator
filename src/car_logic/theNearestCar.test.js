import theNearestCar, { distanceToAvailableCars } from "./theNearestCar";

const distanceToAvailableCarsCases = [
    {
        floorNumber: 7,
        allCarsCurrentFloor: [0, 0],
        allCarsState: ["ready", "ready"],
        allCarsFloorAssignments: [[], []],
        expectedBy: {
            _distanceToAvailableCars: [
                { carId: 0, distance: 7 },
                { carId: 1, distance: 7 }
            ],
            _theNearestCar: 0
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [7, 7],
        allCarsState: ["ready", "ready"],
        allCarsFloorAssignments: [[], []],
        expectedBy: {
            _distanceToAvailableCars: [
                { carId: 0, distance: 0 },
                { carId: 1, distance: 0 }
            ],
            _theNearestCar: 0
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [9, 9],
        allCarsState: ["ready", "ready"],
        allCarsFloorAssignments: [[], []],
        expectedBy: {
            _distanceToAvailableCars: [
                { carId: 0, distance: 2 },
                { carId: 1, distance: 2 }
            ],
            _theNearestCar: 0
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [0, 0],
        allCarsState: ["go-down", "go-up"],
        allCarsFloorAssignments: [[], []],
        expectedBy: {
            _distanceToAvailableCars: [{ carId: 1, distance: 7 }],
            _theNearestCar: 1
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [5, 0],
        allCarsState: ["go-down", "go-up"],
        allCarsFloorAssignments: [[2], [9]],
        expectedBy: {
            _distanceToAvailableCars: [{ carId: 1, distance: 7 }],
            _theNearestCar: 1
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [7, 9],
        allCarsState: ["go-down", "go-up"],
        expectedBy: {
            _distanceToAvailableCars: [],
            _theNearestCar: -1
        }
    }
];

const theNearestCarCases = [
    {
        floorNumber: "z",
        allCarsCurrentFloor: [5, 0],
        allCarsState: ["go-down", "go-down"],
        expectedBy: {
            _theNearestCar: undefined
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [],
        allCarsState: ["go-down", "go-down"],
        expectedBy: {
            _theNearestCar: undefined
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [5, 0],
        allCarsState: [],
        expectedBy: {
            _theNearestCar: undefined
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: null,
        allCarsState: [],
        expectedBy: {
            _theNearestCar: undefined
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: undefined,
        allCarsState: [],
        expectedBy: {
            _theNearestCar: undefined
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [2, 9],
        allCarsState: ["go-down", "go-up"],
        expectedBy: {
            _theNearestCar: -1
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [7, 9],
        allCarsState: ["go-down", "go-up"],
        expectedBy: {
            _theNearestCar: -1
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [6, 9],
        allCarsState: ["go-up", "go-up"],
        expectedBy: {
            _theNearestCar: -1
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [5, 9],
        allCarsState: ["go-up", "go-up"],
        expectedBy: {
            _theNearestCar: 0
        }
    }
];

const distanceToAvailableCars_testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            floorNumber,
            expectedBy: { _distanceToAvailableCars }
        } = cases[i];

        test(
            "distanceToAvailableCars " + casesDescription + " case " + i,
            () => {
                const value = distanceToAvailableCars(
                    allCarsState,
                    allCarsCurrentFloor,
                    floorNumber
                );

                expect(value).toEqual(_distanceToAvailableCars);
            }
        );
    }
};

const theNearestCar_testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            floorNumber,
            expectedBy: { _theNearestCar }
        } = cases[i];

        test("theNearestCar " + casesDescription + " case " + i, () => {
            const value = theNearestCar(
                allCarsState,
                allCarsCurrentFloor,
                floorNumber
            );

            expect(value).toEqual(_theNearestCar);
        });
    }
};

distanceToAvailableCars_testFunction(
    distanceToAvailableCarsCases,
    "distanceToAvailableCarsCases"
);
theNearestCar_testFunction(
    distanceToAvailableCarsCases,
    "distanceToAvailableCarsCases"
);
theNearestCar_testFunction(theNearestCarCases, "theNearestCarCases");
