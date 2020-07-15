// This part of code is supposed to be run
// before ShaftContext is updating allCarsFloorAssignments by addCarFloorAssignment

/**
 * TO DO:
 * @tolerance 0 when car is not moving
 */

interface IParam {
    floorNumber: number;
    allCarsCurrentFloor: number[];
    allCarsState: string[];
    allCarsFloorAssignments: { length: number; [index: number]: number[] };
    assignedCars: number[];
    direction: string;
    allCarsDirection: string | null[];
    tolerance?: number;
}

export const distanceToAvailableCars = ({
    floorNumber,
    allCarsCurrentFloor,
    allCarsState,
    allCarsFloorAssignments,
    assignedCars,
    direction,
    allCarsDirection,
    tolerance = 1 // number of floors between floorNumber and carCurrentFloor that is acceptable to asign car to floor
}: IParam) => {
    let distanceToAvailableCarsArr: {
        carId: number;
        distance: number;
    }[] = [];

    let carState: string, carCurrentFloor: number, distance: number;

    if (
        allCarsState.length > 0 &&
        allCarsCurrentFloor.length > 0 &&
        allCarsState.length === allCarsCurrentFloor.length
    ) {
        for (let carId = 0; carId < allCarsState.length; carId++) {
            carState = allCarsState[carId];
            carCurrentFloor = allCarsCurrentFloor[carId];

            let mainCarTarget: number = Math.max.apply(
                Math,
                allCarsFloorAssignments[carId]
            );

            mainCarTarget =
                mainCarTarget !== Infinity && mainCarTarget !== -Infinity
                    ? mainCarTarget
                    : floorNumber;

            if (
                !assignedCars.includes(carId) && // prevent assign assigend car
                (carState === "ready" ||
                    (carState === "go-up" &&
                        direction === allCarsDirection[carId] &&
                        mainCarTarget &&
                        floorNumber <= mainCarTarget &&
                        carCurrentFloor + tolerance < floorNumber) ||
                    (carState === "go-down" &&
                        direction === allCarsDirection[carId] &&
                        mainCarTarget &&
                        floorNumber >= mainCarTarget &&
                        carCurrentFloor - tolerance > floorNumber))
            ) {
                distance = Math.abs(floorNumber - carCurrentFloor); // Math.abs - make number positive
                distanceToAvailableCarsArr.push({ carId, distance });
            }
        }
    }

    return distanceToAvailableCarsArr;
};

// return id of the nearest car or -1 if there is no available cars
const theNearestCar = ({
    floorNumber,
    allCarsCurrentFloor,
    allCarsState,
    allCarsFloorAssignments,
    assignedCars,
    direction,
    allCarsDirection,
    tolerance
}: IParam) => {
    if (
        allCarsState.length !== 0 &&
        allCarsCurrentFloor.length !== 0 &&
        typeof floorNumber === "number"
    ) {
        const distanceToCars: {
            carId: number;
            distance: number;
        }[] = distanceToAvailableCars({
            floorNumber,
            allCarsCurrentFloor,
            allCarsState,
            allCarsFloorAssignments,
            assignedCars,
            direction,
            allCarsDirection,
            tolerance
        });

        // defaulft value is -1 and it should returned
        // when there is no available car
        let theNearestCarNum: number = -1;
        let min: number = Number.POSITIVE_INFINITY;
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
