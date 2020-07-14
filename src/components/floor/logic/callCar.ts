import { theNearestCar } from "./";

type Props = {
    allCarsState: string[];
    allCarsCurrentFloor: number[];
    allCarsFloorAssignments: { [index: number]: number[]; length: number };
    floorNumber: number;
    addCarFloorAssignment: (carId: number, floorNumber: number) => void;
    setAssignedCars: (data: number[]) => void;
    assignedCars: number[];
    setNoCar: (data: boolean) => void;
    updateCarDirection: (carId: number, direction: string) => void;
};

const callCar = ({
    allCarsState,
    allCarsCurrentFloor,
    allCarsFloorAssignments,
    floorNumber,
    addCarFloorAssignment,
    setAssignedCars,
    assignedCars,
    setNoCar,
    updateCarDirection
}: Props) => (direction: string) => {
    const carId = theNearestCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber,
        assignedCars,
        direction
    });
    if (carId !== null && carId !== undefined && carId >= 0) {
        addCarFloorAssignment(carId, floorNumber);
        setAssignedCars([...assignedCars, carId]);
        updateCarDirection(carId, direction);
    } else {
        setNoCar(true);
    }
};

export default callCar;
