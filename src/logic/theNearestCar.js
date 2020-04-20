// returns id of the nearest car with correct carState or null if there is no available cars

const theNearestCar = (allCarStates, allCarsCurrentFloor, floorNumber) => {
    // Step 1 - get id of cars with correct carState and calculate distance from them
    let distanceOfCarsWithCorrectCarState = [];
    let carState, currentFloor, distanceToFloor;

    for (let carId = 0; carId < allCarStates.length; carId++) {
        carState = allCarStates[carId];
        currentFloor = allCarsCurrentFloor[carId];
        distanceToFloor = Math.abs(floorNumber - currentFloor); // Math.abs - make number positive

        if (
            carState === null ||
            (carState === "go-up" && currentFloor < floorNumber) ||
            (carState === "go-down" && currentFloor > floorNumber)
        ) {
            distanceOfCarsWithCorrectCarState.push({
                carId,
                distanceToFloor
            });
        }
    }

    // Step 2 - return first car id of car whitch has the smallest distance
    let min = Number.POSITIVE_INFINITY;
    let theNearestCarNum = null;

    for (let i = 0; i < distanceOfCarsWithCorrectCarState.length; i++) {
        let carId = distanceOfCarsWithCorrectCarState[i].carId;
        let distanceToFloor =
            distanceOfCarsWithCorrectCarState[i].distanceToFloor;

        if (distanceToFloor < min) {
            theNearestCarNum = carId;
        }
        min = distanceToFloor < min ? distanceToFloor : min;
    }

    return theNearestCarNum;
};

export default theNearestCar;
