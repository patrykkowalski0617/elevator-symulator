export default function animation(frameTime = 15) {
    const start = (targetFloor, currentFloor, getCurrentFloor, getPosition) => {
        let position = 0;
        let _currentFloor = currentFloor;
        let intervalId;

        const intervalFrame = () => {
            position++;
            if (
                position === targetFloor ||
                (position % 100 === 0 && position !== targetFloor * 100)
            ) {
                _currentFloor++;
                getCurrentFloor(_currentFloor);
            }
            getPosition(position);

            const target = targetFloor * 100;

            if (position >= target) {
                clearInterval(intervalId);
            }
        };

        intervalFrame();
        intervalId = setInterval(() => {
            intervalFrame();
        }, frameTime);
    };

    return { start };
}
