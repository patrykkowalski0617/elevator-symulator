type Props = {
    formStickManData: {
        destination: number;
        howMany: number;
        floorNumber: number;
    } | null;
    floorNumber: number;
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

const addStickmansOnFloor = ({
    formStickManData,
    floorNumber,
    stickMans,
    setStickMans
}: Props) => {
    if (formStickManData?.floorNumber === floorNumber) {
        const { destination, howMany } = formStickManData;
        const newStickMans = Array(howMany).fill({
            destination,
            direction:
                destination > floorNumber
                    ? "up"
                    : destination < floorNumber
                    ? "down"
                    : null,
            lifeState: "wait-for-car",
            carId: null,
            placeInCar: null
        });

        const insert = [...stickMans, ...newStickMans];
        setStickMans(insert);
    }
};

export default addStickmansOnFloor;
