type Props = {
    assignedCars: number[];
    allCarsState: string[];
    carsOnFloor: number[];
    setCarsOnFloor: (carsOnFloor: number[]) => void;
    allCarsCurrentFloor: number[];
    floorNumber: number;
    callback: (carId: number) => void;
};

const carCame = ({
    assignedCars,
    allCarsState,
    carsOnFloor,
    setCarsOnFloor,
    allCarsCurrentFloor,
    floorNumber,
    callback
}: Props) => {
    if (assignedCars.length) {
        for (let i = 0; i < assignedCars.length; i++) {
            const carId = assignedCars[i];
            const carState = allCarsState[carId];
            const carFloorNumber = allCarsCurrentFloor[carId];
            if (
                carState.includes("door-open") &&
                !carsOnFloor.includes(carId) &&
                carFloorNumber === floorNumber
            ) {
                setCarsOnFloor([...carsOnFloor, carId]);
                callback(carId);
            }
        }
    }
};

export default carCame;
