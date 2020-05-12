import carTarget from "./carTarget";
import { standardCases } from "./_testCases";

const testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        // const i = 0;
        const {
            floorNumber,
            expectedBy: { _theNearestCar, _carTarget }
        } = cases[i];
        let { allCarsFloorAssignments } = cases[i];

        const carId = _theNearestCar;
        // ShaftContext is updating allCarsFloorAssignments by addCarFloorAssignment
        const addCarFloorAssignment = (carId, floorNumber) => {
            if (carId !== null) {
                const _allCarsFloorAssignments = allCarsFloorAssignments;
                const carFloorAssignment = _allCarsFloorAssignments[carId];
                const carFloorAssignmentUpdated = [
                    ...carFloorAssignment,
                    floorNumber
                ];
                _allCarsFloorAssignments.splice(
                    carId,
                    1,
                    carFloorAssignmentUpdated
                );
                return [..._allCarsFloorAssignments];
            }
        };
        allCarsFloorAssignments = addCarFloorAssignment(carId, floorNumber);
        const value = carTarget(allCarsFloorAssignments, carId);
        test("_carTarget " + casesDescription + " case " + i, () => {
            expect(value).toEqual(_carTarget);
        });
    }
};

testFunction(standardCases, "standardCases");
