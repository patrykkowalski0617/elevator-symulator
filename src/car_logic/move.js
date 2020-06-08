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
        carState,
        intervalId,
        isContinuation
    ) => {
        console.log(
            "start",
            targetFloor,
            currentFloor,
            currentPosition,
            carState,
            intervalId,
            isContinuation
        );
        let _intervalId = intervalId;
        let floor = currentFloor;
        let state = carState;
        let position = currentPosition;
        const targetPosition = targetFloor * 100;
        if (intervalId !== null) {
            clearInterval(_intervalId);
        }

        // set immediately after start call
        // when car is not moving
        if (carState === "ready") {
            // when targetFloor is not reached and it's above
            if (targetFloor > currentFloor) {
                state = "go-up";
                if (!isContinuation) {
                    floor++;
                }
            }
            // when targetFloor is not reached and it's below
            else if (targetFloor < currentFloor) {
                state = "go-down";
                if (!isContinuation) {
                    floor--;
                }
            }
            getCarState(state);
            getCurrentFloor(floor);
        } else {
            console.log("_else");
        }

        // set in each intrval
        _intervalId = setInterval(() => {
            console.log(`interval ${_intervalId} iteration`);

            // manage position
            if (state.includes("go-up")) {
                position++;
            } else if (state.includes("go-down")) {
                position--;
            }
            getPosition(position);

            // manage floor
            if (position !== targetFloor * 100 && position % 100 === 0) {
                if (state.includes("go-up")) {
                    floor++;
                } else if (state.includes("go-down")) {
                    floor--;
                }
                getCurrentFloor(floor);
            }

            // manage door
            if (position + 1 === targetFloor * 100) {
                // getCarState(state + "-door-open");
            }

            // clear interval
            if (
                (position >= targetPosition && state.includes("go-up")) ||
                (position <= targetPosition && state.includes("go-down"))
            ) {
                clearInterval(_intervalId);
            }
        }, frameTime);

        if (!state.includes("door-open")) {
            setIntervalId(_intervalId);
        }
    };
    return start;
}
