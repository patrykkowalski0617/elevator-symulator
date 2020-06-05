// This part of code is supposed to be run
// after ShaftContext update allCarsFloorAssignments by addCarFloorAssignment

const carTarget = (floorAssignments, carState) => {
    let target;
    if (floorAssignments.length === 1) {
        target = floorAssignments[0];
    } else if (carState === "go-up") {
        target = Math.min.apply(Math, floorAssignments);
    } else if (carState === "go-down") {
        target = Math.max.apply(Math, floorAssignments);
    }

    return target;
};

export default carTarget;
