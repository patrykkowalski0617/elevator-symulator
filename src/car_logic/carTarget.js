// This part of code is supposed to be run
// after ShaftContext is updating allCarsFloorAssignments by addCarFloorAssignment

const carTarget = (allCarsFloorAssignments, carId) => {
    const carFloorAssignments = allCarsFloorAssignments[carId].sort(
        (a, b) => b + a
    );

    return carFloorAssignments[0];
};

export default carTarget;
