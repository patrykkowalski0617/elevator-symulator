// This part of code is supposed to be run
// before ShaftContext is updating allCarsFloorAssignments by addCarFloorAssignment

interface IParam {
    floorNumber: number;
    allCarsCurrentFloor: number[];
    allCarsState: string[];
    allCarsFloorAssignments: { length: number; [index: number]: number[] };
    tolerance?: number;
}

export const distanceToAvailableCars = ({
    floorNumber,
    allCarsCurrentFloor,
    allCarsState,
    allCarsFloorAssignments,
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
            distance = Math.abs(floorNumber - carCurrentFloor); // Math.abs - make number positive

            let mainCarTarget: number | null = Math.max.apply(
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
                    mainCarTarget &&
                    floorNumber < mainCarTarget &&
                    carCurrentFloor + tolerance < floorNumber) ||
                (carState.includes("go-down") &&
                    mainCarTarget &&
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
const theNearestCar = ({
    floorNumber,
    allCarsCurrentFloor,
    allCarsState,
    allCarsFloorAssignments,
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
