const testCases = [
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
    }
];

export default testCases;
