export default function animation(
    getCarState,
    getCurrentFloor,
    getPosition,
    updateCarState,
    setIntervalId,
    frameTime = 10
) {
    const start = (
        targetFloor,
        currentFloor,
        currentPosition,
        intervalId,
        carId
    ) => {
        let _intervalId;
        clearInterval(intervalId);
        // it suppose to update proper state depending on move direction
        updateCarState(carId, "go-up");
        let position = currentPosition;
        let floor = currentFloor;
        const target = targetFloor * 100;

        _intervalId = setInterval(() => {
            position++;
            getPosition(position);
            if (
                position === targetFloor ||
                (position % 100 === 0 && position !== targetFloor * 100)
            ) {
                floor++;
                getCurrentFloor(floor);
            }
            if (position >= target) {
                clearInterval(_intervalId);
            }
        }, frameTime);
        setIntervalId(_intervalId);
    };
    return { start };
}
