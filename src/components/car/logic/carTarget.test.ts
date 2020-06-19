import carTarget from "./carTarget";

interface ICases {
    length: number;
    [index: number]: {
        floorAssignments: number[];
        carState: string;
        expectedResult: number;
    };
}

const cases = [
    { floorAssignments: [0], carState: "ready", expectedResult: 0 },
    { floorAssignments: [5, 2], carState: "go-up", expectedResult: 2 },
    { floorAssignments: [5, 2], carState: "go-down", expectedResult: 5 }
];

const testFunction = (cases: ICases, casesDescription: string) => {
    for (let i = 0; i < cases.length; i++) {
        const { floorAssignments, carState, expectedResult } = cases[i];
        const value = carTarget(floorAssignments, carState);
        test("_carTarget " + casesDescription + " case " + i, () => {
            expect(value).toEqual(expectedResult);
        });
    }
};

testFunction(cases, "carTarget");
