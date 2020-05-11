import carTarget from "./carTarget";
import testCases from "./_testCases";

for (let i = 0; i < testCases.length; i++) {
    // const i = 0;
    const {
        floorNumber,
        expectedBy: { _theNearestCar, _carTarget }
    } = testCases[i];
    let { allCarsFloorAssignments } = testCases[i];

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
    test("_carTarget case " + i, () => {
        expect(value).toEqual(_carTarget);
    });
}
