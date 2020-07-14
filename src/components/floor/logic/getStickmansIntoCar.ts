type Props = {
    whichCarCame: number | null;
    allCarsDirection: string | null[];
    allCarsStickMans: {
        lifeState: string;
        destination: number;
        carId: number | null;
        placeInCar: number | null;
    }[][];
    stickMans: {
        destination: number;
        direction: string | null;
        lifeState: string;
        carId: number | null;
        placeInCar: number | null;
    }[];
    floorNumber: number;
    setStickMans: (
        stickMans: {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    ) => void;
    setDeleteStickMans: (carId: number | null) => void;
    addPassengers: (
        data: {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    ) => void;
    setWhichCarCame: (whichCarCame: number | null) => void;
    setCarReadyToGo: (carId: number) => void;
};

const getStickmansIntoCar = ({
    whichCarCame,
    allCarsDirection,
    allCarsStickMans,
    stickMans,
    floorNumber,
    setStickMans,
    setDeleteStickMans,
    addPassengers,
    setWhichCarCame,
    setCarReadyToGo
}: Props) => {
    if (whichCarCame !== null) {
        const carId = whichCarCame;
        const carDirection = allCarsDirection[carId];
        const carFreePlaces = 4 - allCarsStickMans[carId].length;
        let freePlacesLeft = carFreePlaces;
        const updatesStickMans = [...stickMans].reverse().map(item => {
            const { destination, direction, lifeState } = item;
            const _destination = destination;
            const _direction =
                destination > floorNumber
                    ? "up"
                    : destination < floorNumber
                    ? "down"
                    : null;
            const _carId =
                typeof item.carId === "number"
                    ? item.carId
                    : carDirection === direction && freePlacesLeft > 0
                    ? carId
                    : null;
            const _lifeState =
                carDirection === direction && freePlacesLeft > 0
                    ? "get-into-car"
                    : lifeState;
            const _placeInCar =
                typeof item.placeInCar === "number"
                    ? item.placeInCar
                    : _lifeState === "get-into-car"
                    ? freePlacesLeft - 1
                    : null;

            // update number of available places in car
            if (carDirection === direction) {
                freePlacesLeft--;
            }

            return {
                destination: _destination,
                direction: _direction,
                lifeState: _lifeState,
                carId: _carId,
                placeInCar: _placeInCar
            };
        });
        setStickMans([...updatesStickMans].reverse());
        setTimeout(() => {
            setDeleteStickMans(whichCarCame);
            let stickMansForCar = updatesStickMans.filter(item =>
                item.carId === whichCarCame ? true : false
            );

            stickMansForCar = stickMansForCar.map(item => {
                const { destination, direction, carId, placeInCar } = item;
                return {
                    destination,
                    direction,
                    lifeState: "in-car",
                    carId,
                    placeInCar
                };
            });
            setCarReadyToGo(whichCarCame);
            addPassengers(stickMansForCar);
        }, 2500);
        setWhichCarCame(null);
    }
};

export default getStickmansIntoCar;
