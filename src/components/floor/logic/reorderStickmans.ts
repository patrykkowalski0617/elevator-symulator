type Props = {
    carReadyToGo: number | null;
    carsReadyToGo: number[];
    setCarsReadyToGo: (carId: number[]) => void;
    carsOnFloor: number[];
    stickMans: {
        destination: number;
        direction: string | null;
        lifeState: string;
        carId: number | null;
        placeInCar: number | null;
    }[];
    setStickMans: (
        stickMans: {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    ) => void;
};

const reorderStickmans = ({
    carReadyToGo,
    carsReadyToGo,
    setCarsReadyToGo,
    carsOnFloor,
    stickMans,
    setStickMans
}: Props) => {
    if (carReadyToGo !== null) {
        setCarsReadyToGo([...carsReadyToGo, carReadyToGo]);
    }
    const carsReady = [...carsReadyToGo, carReadyToGo];
    const check = [];
    for (let i = 0; i < carsOnFloor.length; i++) {
        if (carsReady.includes(carsOnFloor[i])) {
            check.push(true);
        }
    }
    if (check.length === carsOnFloor.length) {
        const stickMansUpdated = stickMans.filter(
            item => item.lifeState !== "kill"
        );
        setStickMans(stickMansUpdated);
    }
};

export default reorderStickmans;
