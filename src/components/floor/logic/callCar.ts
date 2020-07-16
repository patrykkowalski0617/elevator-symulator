import { theNearestCar } from "./";

type Props = {
    allCarsState: string[];
    allCarsCurrentFloor: number[];
    allCarsFloorAssignments: { [index: number]: number[]; length: number };
    floorNumber: number;
    addCarFloorAssignment: (carId: number, floorNumber: number) => void;
    assignedCars: number[];
    setNoCar: (data: boolean) => void;
    updateCarDirection: (carId: number, direction: string) => void;
    allCarsDirection: string | null[];
};

const callCar = ({
    allCarsState,
    allCarsCurrentFloor,
    allCarsFloorAssignments,
    floorNumber,
    addCarFloorAssignment,
    assignedCars,
    setNoCar,
    updateCarDirection,
    allCarsDirection
}: Props) => (direction: string) => {
    const carId = theNearestCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber,
        assignedCars,
        direction,
        allCarsDirection
    });
    if (typeof carId === "number" && carId >= 0) {
        addCarFloorAssignment(carId, floorNumber);
        if (allCarsDirection[carId] === null) {
            updateCarDirection(carId, direction);
        }
    } else {
        setNoCar(true);
    }
};

export default callCar;
