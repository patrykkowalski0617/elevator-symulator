type Props = {
    waitingForCar: { up: boolean; down: boolean };
    stickMansDestinations: number[];
    addFloorWaitingForCar: (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => void;
    floorNumber: number;
};

const waitingForCarUpdate = ({
    waitingForCar,
    stickMansDestinations,
    addFloorWaitingForCar,
    floorNumber
}: Props) => {
    if (stickMansDestinations.length) {
        const uniqFloorsSet = new Set(stickMansDestinations);
        const uniqFloors = Array.from(uniqFloorsSet);
        const up = uniqFloors.some((item: any) => item > floorNumber);
        const down = uniqFloors.some((item: any) => item < floorNumber);
        if (!waitingForCar.up || !waitingForCar.down) {
            addFloorWaitingForCar(floorNumber, { up, down });
        }
    }
};

export default waitingForCarUpdate;
