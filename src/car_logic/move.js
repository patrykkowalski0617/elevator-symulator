export default function move(
    getCarState,
    getCurrentFloor,
    getPosition,
    setIntervalId,
    frameTime = 10
) {
    const start = (
        targetFloor,
        currentFloor,
        currentPosition,
        intervalId,
        isContinuation
    ) => {
        let _intervalId;
        clearInterval(intervalId);

        // set immediately after start
        let state = "";
        let floor = currentFloor;
        if (targetFloor > currentFloor) {
            state = "go-up";
            if (!isContinuation) {
                floor++;
            }
        } else if (targetFloor < currentFloor) {
            state = "go-down";
            if (!isContinuation) {
                floor--;
            }
        }
        getCarState(state);
        getCurrentFloor(floor);

        // set in each intrval
        let position = currentPosition;
        const target = targetFloor * 100;
        _intervalId = setInterval(() => {
            if (state === "go-up") {
                position++;
            } else if (state === "go-down") {
                position--;
            }
            getPosition(position);
            if (position !== targetFloor * 100 && position % 100 === 0) {
                if (state === "go-up") {
                    floor++;
                } else if (state === "go-down") {
                    floor--;
                }
                getCurrentFloor(floor);
            }

            if (position >= target && state === "go-up") {
                clearInterval(_intervalId);
            } else if (position <= target && state === "go-down") {
                clearInterval(_intervalId);
            }
        }, frameTime);

        setIntervalId(_intervalId);
    };
    return start;
}
