import carTarget, { theNearestFloors } from "./carTarget";

const theNearestFloorsCases = [
    [
        [[2, 5, 9, 12], 7],
        [5, 9]
    ],
    [
        [[2, 5, 7, 9, 12], 7],
        [7, 7]
    ]
];

for (let i = 0; i < theNearestFloorsCases.length; i++) {
    const [
        [carFloorAssignments, carCurrentFloor],
        expected
    ] = theNearestFloorsCases[i];

    test("case ", () => {
        expect(theNearestFloors(carFloorAssignments, carCurrentFloor)).toEqual(
            expected
        );
    });
}
