import carTarget, { theNearestFloors } from "./carTarget";

const theNearestFloorsCases = [
    [
        [[9, 12], 7],
        [null, 9]
    ]
];

for (let i = 0; i < theNearestFloorsCases.length; i++) {
    const [
        [carFloorAssignments, carCurrentFloor],
        expected
    ] = theNearestFloorsCases[i];

    test("theNearestFloors case " + i, () => {
        expect(theNearestFloors(carFloorAssignments, carCurrentFloor)).toEqual(
            expected
        );
    });
}

const carTargetCases = [
    {
        carState: "ready",
        carFloorAssignments: [2],
        carCurrentFloor: 7,
        expected: 2
    }
];

for (let i = 0; i < carTargetCases.length; i++) {
    const {
        carState,
        carFloorAssignments,
        carCurrentFloor,
        expected
    } = carTargetCases[i];

    test("carTarget case " + i, () => {
        expect(
            carTarget(carState, carFloorAssignments, carCurrentFloor)
        ).toEqual(expected);
    });
}
