type Props = {
    assignedCars: number[];
    allCarsState: string[];
    carsOnFloor: number[];
    setCarsOnFloor: (carsOnFloor: number[]) => void;
    callback: (carId: number) => void;
};

const carCame = ({
    assignedCars,
    allCarsState,
    carsOnFloor,
    setCarsOnFloor,
    callback
}: Props) => {
    if (assignedCars.length) {
        for (let i = 0; i < assignedCars.length; i++) {
            const carId = assignedCars[i];
            const carState = allCarsState[carId];
            if (
                carState.includes("door-open") &&
                !carsOnFloor.includes(carId)
            ) {
                setCarsOnFloor([...carsOnFloor, carId]);
                callback(carId);
            }
        }
    }
};

export default carCame;
