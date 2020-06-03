// This part of code is supposed to be run
// after ShaftContext update allCarsFloorAssignments by addCarFloorAssignment

const carTarget = (allCarsFloorAssignments, carId) => {
    let carFloorAssignments, target;
    if (typeof carId === "number") {
        carFloorAssignments = allCarsFloorAssignments[carId].sort(
            (a, b) => a - b
        );
        target = carFloorAssignments[0];
    }
    return target;
};

export default carTarget;
