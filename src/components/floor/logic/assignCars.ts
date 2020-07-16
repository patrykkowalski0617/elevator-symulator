import { theNearestCar } from "./";

type Props = {
    allCarsFloorAssignments: { [index: number]: number[]; length: number };
    floorNumber: number;
    assignedCars: number[];
    setAssignedCars: (assignedCars: number[]) => void;
};

const assignCars = ({
    allCarsFloorAssignments,
    floorNumber,
    assignedCars,
    setAssignedCars
}: Props) => {
    for (let carId = 0; carId < allCarsFloorAssignments.length; carId++) {
        const element = allCarsFloorAssignments[carId];
        if (element.includes(floorNumber) && !assignedCars.includes(carId)) {
            setAssignedCars([...assignedCars, carId]);
        }
    }
};

export default assignCars;
