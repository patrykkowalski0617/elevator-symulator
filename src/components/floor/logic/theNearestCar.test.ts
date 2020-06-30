import theNearestCar, { distanceToAvailableCars } from "./theNearestCar";

interface ICases {
    length: number;
    [index: number]: {
        allCarsCurrentFloor: number[];
        floorNumber: number;
        allCarsState: string[];
        allCarsFloorAssignments: number[][];
        expectedBy: {
            _distanceToAvailableCars: { carId: number; distance: number }[];
            _theNearestCar: number;
        };
    };
}

const cases = [
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
        allCarsFloorAssignments: [[], []],
        allCarsState: ["go-down", "go-up"],
        expectedBy: {
            _distanceToAvailableCars: [],
            _theNearestCar: -1
        }
    }
];

const distanceToAvailableCars_testFunction = (
    cases: ICases,
    casesDescription: string
) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            allCarsFloorAssignments,
            floorNumber,
            expectedBy: { _distanceToAvailableCars }
        } = cases[i];

        test(
            "distanceToAvailableCars " + casesDescription + " case " + i,
            () => {
                const value: {
                    carId: number;
                    distance: number;
                }[] = distanceToAvailableCars({
                    allCarsState,
                    allCarsCurrentFloor,
                    allCarsFloorAssignments,
                    floorNumber
                });

                expect(value).toEqual(_distanceToAvailableCars);
            }
        );
    }
};

const theNearestCar_testFunction = (
    cases: ICases,
    casesDescription: string
) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            allCarsFloorAssignments,
            floorNumber,
            expectedBy: { _theNearestCar }
        } = cases[i];

        test("theNearestCar " + casesDescription + " case " + i, () => {
            const value: number | undefined = theNearestCar({
                allCarsState,
                allCarsCurrentFloor,
                allCarsFloorAssignments,
                floorNumber
            });

            expect(value).toEqual(_theNearestCar);
        });
    }
};

distanceToAvailableCars_testFunction(cases, "distanceToAvailableCarsCases");
theNearestCar_testFunction(cases, "theNearestCarCases");
