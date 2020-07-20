// This part of code is supposed to be run
// after ShaftContext update allCarsFloorAssignments by addCarFloorAssignment

const carTarget = (
    floorAssignments: number[],
    carState: string,
    currentFloor: number
) => {
    let target: number | undefined;

    const above = floorAssignments.filter(item => item >= currentFloor);
    const below = floorAssignments.filter(item => item <= currentFloor);

    if (floorAssignments.length === 1) {
        target = floorAssignments[0];
    } else if (carState === "go-up") {
        target = Math.min.apply(Math, above);
    } else if (carState === "go-down") {
        target = Math.max.apply(Math, below);
    }

    if (target !== Infinity && target !== -Infinity) {
        return target;
    }
};

export default carTarget;
