const distanceToAvailableCars = (
    allCarStates,
    allCarsCurrentFloor,
    floorNumber
) => {
    let distanceToAvailableCarsArr = []; // defaulft value is []

    let carState, carCurrentFloor, distance;

    const tolerance = 1; // number of floors between floorNumber and carCurrentFloor that is acceptable to asign car to floor

    if (
        allCarStates.length > 0 &&
        allCarsCurrentFloor.length > 0 &&
        allCarStates.length === allCarsCurrentFloor.length
    ) {
        for (let carId = 0; carId < allCarStates.length; carId++) {
            carState = allCarStates[carId];
            carCurrentFloor = allCarsCurrentFloor[carId];
            distance = Math.abs(floorNumber - carCurrentFloor); // Math.abs - make number positive
            if (
                carState === "ready" ||
                (carState === "go-up" &&
                    carCurrentFloor + tolerance < floorNumber) ||
                (carState === "go-down" &&
                    carCurrentFloor - tolerance > floorNumber)
            ) {
                distanceToAvailableCarsArr.push({ carId, distance });
            }
        }
    }

    return distanceToAvailableCarsArr;
};

export default distanceToAvailableCars;
