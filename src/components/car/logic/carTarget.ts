// This part of code is supposed to be run
// after ShaftContext update allCarsFloorAssignments by addCarFloorAssignment

const carTarget = (floorAssignments: number[], carState: string) => {
    // console.log("carTarget", { floorAssignments, carState });
    let target: number | undefined;
    if (floorAssignments.length === 1) {
        target = floorAssignments[0];
    } else if (carState === "go-up") {
        target = Math.min.apply(Math, floorAssignments);
    } else if (carState === "go-down") {
        target = Math.max.apply(Math, floorAssignments);
    }

    console.log(target);
    if (target !== Infinity && target !== -Infinity) {
        return target;
    }
};

export default carTarget;
