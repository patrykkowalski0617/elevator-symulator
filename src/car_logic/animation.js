export default function animation(frameTime) {
    const start = (targetFloor, currentFloor, getCurrentFloor, getPosition) => {
        const frame = () => {
            position++;
        };
        let position = 0;
        let _currentFloor = currentFloor;
        let intervalId;

        intervalId = setInterval(() => {
            frame();
            if (position % 100 === 0) {
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
