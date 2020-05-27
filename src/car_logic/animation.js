export default function animation(frameTime) {
    const start = (targetFloor, currentFloor, getCurrentFloor, getPosition) => {
        let position = 0;
        let _currentFloor = currentFloor;
        let intervalId;

        intervalId = setInterval(() => {
            position++;
            if (position % 100 === 0) {
                _currentFloor++;
                getCurrentFloor(_currentFloor);
            }
            getPosition(position);

            const target = targetFloor * 100;

            if (position >= target) {
                clearInterval(intervalId);
            }
        }, frameTime);
    };

    return { start };
}
