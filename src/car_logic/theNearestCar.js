// This part of code is supposed to be run
// before ShaftContext is updating allCarsFloorAssignments by addCarFloorAssignment

export const distanceToAvailableCars = (
    allCarsState,
    allCarsCurrentFloor,
    allCarsFloorAssignments,
    floorNumber,
    tolerance = 1 // number of floors between floorNumber and carCurrentFloor that is acceptable to asign car to floor
) => {
    let distanceToAvailableCarsArr = []; // defaulft value is []

    let carState, carCurrentFloor, distance;

    if (
        allCarsState.length > 0 &&
        allCarsCurrentFloor.length > 0 &&
        allCarsState.length === allCarsCurrentFloor.length
    ) {
        for (let carId = 0; carId < allCarsState.length; carId++) {
            carState = allCarsState[carId];
            carCurrentFloor = allCarsCurrentFloor[carId];
            distance = Math.abs(floorNumber - carCurrentFloor); // Math.abs - make number positive

            let mainCarTarget = Math.max.apply(
                Math,
                allCarsFloorAssignments[carId]
            );

            mainCarTarget =
                mainCarTarget !== Infinity && mainCarTarget !== -Infinity
                    ? mainCarTarget
                    : null;

            if (
                carState === "ready" ||
                (carState.includes("go-up") &&
                    floorNumber < mainCarTarget &&
                    carCurrentFloor + tolerance < floorNumber) ||
                (carState.includes("go-down") &&
                    floorNumber > mainCarTarget &&
                    carCurrentFloor - tolerance > floorNumber)
            ) {
                distanceToAvailableCarsArr.push({ carId, distance });
            }
        }
    }

    return distanceToAvailableCarsArr;
};

// return id of the nearest car or -1 if there is no available cars
const theNearestCar = (
    allCarsState,
    allCarsCurrentFloor,
    allCarsFloorAssignments,
    floorNumber,
    tolerance
) => {
    if (
        allCarsState.length !== 0 &&
        allCarsCurrentFloor.length !== 0 &&
        typeof floorNumber === "number"
    ) {
        const distanceToCars = distanceToAvailableCars(
            allCarsState,
            allCarsCurrentFloor,
            allCarsFloorAssignments,
            floorNumber,
            tolerance
        );

        // defaulft value is -1 and it should returned
        // when there is no available car
        let theNearestCarNum = -1;
        let min = Number.POSITIVE_INFINITY;
        for (let i = 0; i < distanceToCars.length; i++) {
            const { carId, distance } = distanceToCars[i];

            if (distance < min) {
                theNearestCarNum = carId;
            }
            min = distance < min ? distance : min;
        }

        return theNearestCarNum;
    }
};

export default theNearestCar;
