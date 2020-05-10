const theNearestCar = distanceToAvailableCars => {
    let theNearestCarNum = null; // defaulft value is null
    let min = Number.POSITIVE_INFINITY;
    for (let i = 0; i < distanceToAvailableCars.length; i++) {
        const { carId, distance } = distanceToAvailableCars[i];

        if (distance < min) {
            theNearestCarNum = carId;
        }
        min = distance < min ? distance : min;
    }

    // return id of the nearest car or null if there is no available cars
    return theNearestCarNum;
};

export default theNearestCar;
