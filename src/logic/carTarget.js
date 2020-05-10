export const theNearestFloors = (carFloorAssignments, carCurrentFloor) => {
    let theNearestFloorBelow = carFloorAssignments
        .sort((a, b) => b - a)
        .find(floor => floor <= carCurrentFloor);

    let theNearestFloorAbove = carFloorAssignments
        .sort((a, b) => a - b)
        .find(floor => floor >= carCurrentFloor);

    theNearestFloorBelow = theNearestFloorBelow ? theNearestFloorBelow : null;
    theNearestFloorAbove = theNearestFloorAbove ? theNearestFloorAbove : null;

    return [theNearestFloorBelow, theNearestFloorAbove];
};

const carTarget = (carState, carFloorAssignments, carCurrentFloor) => {
    let target = null;
    if (carFloorAssignments.length > 1) {
        const targets = theNearestFloors(carFloorAssignments, carCurrentFloor);
        if (carState === "go-up") {
            target = targets[1];
        } else if (carState === "go-down") {
            target = targets[0];
        }
    } else if (carState === "ready" && carFloorAssignments.length !== 0) {
        target = carFloorAssignments[0];
    }

    return target;
};

export default carTarget;
