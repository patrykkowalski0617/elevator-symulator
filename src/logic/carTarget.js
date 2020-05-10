export const theNearestFloors = (carFloorAssignments, carCurrentFloor) => {
    const theNearestFloorBelow = carFloorAssignments
        .sort((a, b) => b - a)
        .find(floor => floor <= carCurrentFloor);

    const theNearestFloorAbove = carFloorAssignments
        .sort((a, b) => a - b)
        .find(floor => floor >= carCurrentFloor);

    return [theNearestFloorBelow, theNearestFloorAbove];
};

// breakingDistance unit is number of floors
const carTarget = (
    carState,
    carFloorAssignments,
    carCurrentFloor,
    breakingDistance
) => {
    return theNearestFloors(carFloorAssignments, carCurrentFloor);
};

export default carTarget;
