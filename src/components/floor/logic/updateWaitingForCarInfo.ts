type Props = {
    stickMans: {
        destination: number;
        direction: string | null;
        lifeState: string;
        carId: number | null;
        placeInCar: number | null;
    }[];
    floorNumber: number;
    setWaitingForCar: (data: { up: boolean; down: boolean }) => void;
};

const updateWaitingForCarInfo = ({
    stickMans,
    floorNumber,
    setWaitingForCar
}: Props) => {
    const stickMansDestination = stickMans.map(
        (item: { destination: number }) => item.destination
    );
    const uniqFloorsSet = new Set(stickMansDestination);
    const uniqFloors = Array.from(uniqFloorsSet);
    const up = uniqFloors.some((item: any) => item > floorNumber);
    const down = uniqFloors.some((item: any) => item < floorNumber);
    setWaitingForCar({ up, down });
};

export default updateWaitingForCarInfo;
