type Props = {
    assignedCars: number[];
    allCarsState: string[];
    carsOnFloor: number[];
    setCarsOnFloor: (carsOnFloor: number[]) => void;
};

let carId: number;

const carCame = ({
    assignedCars,
    allCarsState,
    carsOnFloor,
    setCarsOnFloor
}: Props) => {
    if (assignedCars.length) {
        for (let i = 0; i < assignedCars.length; i++) {
            const _carId = assignedCars[i];
            const carState = allCarsState[_carId];
            if (
                carState.includes("door-open") &&
                !carsOnFloor.includes(_carId)
            ) {
                carId = _carId;
                setCarsOnFloor([...carsOnFloor, _carId]);
            }
        }
    }

    return carId;
};

export default carCame;
