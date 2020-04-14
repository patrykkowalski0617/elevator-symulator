// returns id of the nearest car with correct direction or null if there is no available cars

const theNearestCar = (allDirections, allCarsCurrentFloor, floorNumber) => {
    // Step 1 - get id of cars with correct direction and calculate distance from them
    let distanceOfCarsWithCorrectDirection = [];
    let direction, currentFloor, distanceToFloor;

    for (let carId = 0; carId < allDirections.length; carId++) {
        direction = allDirections[carId];
        currentFloor = allCarsCurrentFloor[carId];
        distanceToFloor = Math.abs(floorNumber - currentFloor); // Math.abs - make number positive

        if (
            direction === null ||
            (direction === "up" && currentFloor < floorNumber) ||
            (direction === "down" && currentFloor > floorNumber)
        ) {
            distanceOfCarsWithCorrectDirection.push({
                carId,
                distanceToFloor
            });
        }
    }

    // Step 2 - return first car id of car whitch has the smallest distance
    let min = Number.POSITIVE_INFINITY;
    let theNearestCarNum = null;

    for (let i = 0; i < distanceOfCarsWithCorrectDirection.length; i++) {
        let carId = distanceOfCarsWithCorrectDirection[i].carId;
        let distanceToFloor =
            distanceOfCarsWithCorrectDirection[i].distanceToFloor;

        if (distanceToFloor < min) {
            theNearestCarNum = carId;
        }
        min = distanceToFloor < min ? distanceToFloor : min;
    }

    return theNearestCarNum;
};

export default theNearestCar;
