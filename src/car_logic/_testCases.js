export const standardCases = [
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
            _theNearestCar: 0,
            _carTarget: 7
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
            _theNearestCar: 0,
            _carTarget: 7
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
            _theNearestCar: 0,
            _carTarget: 7
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [0, 0],
        allCarsState: ["go-down", "go-up"],
        allCarsFloorAssignments: [[], []],
        expectedBy: {
            _distanceToAvailableCars: [{ carId: 1, distance: 7 }],
            _theNearestCar: 1,
            _carTarget: 7
        }
    },
    {
        floorNumber: 7,
        allCarsCurrentFloor: [5, 0],
        allCarsState: ["go-down", "go-up"],
        allCarsFloorAssignments: [[2], [9]],
        expectedBy: {
            _distanceToAvailableCars: [{ carId: 1, distance: 7 }],
            _theNearestCar: 1,
            _carTarget: 7
        }
    }
];

export const theNearestCarCases = [
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
