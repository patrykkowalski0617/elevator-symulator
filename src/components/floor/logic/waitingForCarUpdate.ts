type Props = {
    _waitingForCar: { up: boolean; down: boolean };
    stickMansDestination: number[];
    floorNumber: number;
    _setWaitingForCar: (data: { up: boolean; down: boolean }) => void;
};

const waitingForCarUpdate = ({
    _waitingForCar,
    stickMansDestination,
    floorNumber,
    _setWaitingForCar
}: Props) => {
    if (stickMansDestination.length) {
        const uniqFloorsSet = new Set(stickMansDestination);
        const uniqFloors = Array.from(uniqFloorsSet);
        const up = uniqFloors.some((item: any) => item > floorNumber);
        const down = uniqFloors.some((item: any) => item < floorNumber);
        if (!_waitingForCar.up || !_waitingForCar.down) {
            _setWaitingForCar({ up, down });
        }
    }
};

export default waitingForCarUpdate;
