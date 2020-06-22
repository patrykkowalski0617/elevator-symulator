import { theNearestCar } from "../../car/logic";

type Props = {
    allCarsState: string[];
    allCarsCurrentFloor: number[];
    allCarsFloorAssignments: { [index: number]: number[]; length: number };
    floorNumber: number;
    addCarFloorAssignment: (carId: number, floorNumber: number) => void;
    setAssignedCars: (data: number[]) => void;
    assignedCars: number[];
    setNoCar: (data: boolean) => void;
};

const callCar = ({
    allCarsState,
    allCarsCurrentFloor,
    allCarsFloorAssignments,
    floorNumber,
    addCarFloorAssignment,
    setAssignedCars,
    assignedCars,
    setNoCar
}: Props) => () => {
    const carId = theNearestCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber
    });
    if (carId !== null && carId !== undefined && carId >= 0) {
        addCarFloorAssignment(carId, floorNumber);
        setAssignedCars([...assignedCars, carId]);
    } else {
        setNoCar(true);
    }
};

export default callCar;
