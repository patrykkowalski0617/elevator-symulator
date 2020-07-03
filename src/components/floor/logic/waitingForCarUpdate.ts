type Props = {
    waitingForCar: { up: boolean; down: boolean };
    stickMansDestination: number[];
    addFloorWaitingForCar: (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => void;
    floorNumber: number;
};

const waitingForCarUpdate = ({
    waitingForCar,
    stickMansDestination,
    addFloorWaitingForCar,
    floorNumber
}: Props) => {
    if (stickMansDestination.length) {
        const uniqFloorsSet = new Set(stickMansDestination);
        const uniqFloors = Array.from(uniqFloorsSet);
        const up = uniqFloors.some((item: any) => item > floorNumber);
        const down = uniqFloors.some((item: any) => item < floorNumber);
        if (!waitingForCar.up || !waitingForCar.down) {
            addFloorWaitingForCar(floorNumber, { up, down });
        }
    }
};

export default waitingForCarUpdate;
