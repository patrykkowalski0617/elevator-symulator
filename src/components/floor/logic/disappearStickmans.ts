type Props = {
    deleteStickMans: number | null;
    setDeleteStickMans: (deleteStickMans: number | null) => void;
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

const disappearStickmans = ({
    deleteStickMans,
    setDeleteStickMans,
    stickMans,
    setStickMans
}: Props) => {
    if (deleteStickMans !== null) {
        setDeleteStickMans(null);
        const updated = stickMans.map(item => {
            const {
                destination,
                direction,
                lifeState,
                carId,
                placeInCar
            } = item;
            let _lifeState =
                lifeState === "get-into-car" && carId === deleteStickMans
                    ? "kill"
                    : lifeState;

            return {
                destination,
                direction,
                lifeState: _lifeState,
                carId,
                placeInCar
            };
        });

        setStickMans(updated);
    }
};

export default disappearStickmans;
