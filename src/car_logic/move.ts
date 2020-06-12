export default function move(
    getCarState: (state: string) => void,
    getCurrentFloor: (floor: number) => void,
    getPosition: (floor: number) => void,
    setIntervalId: (id: number) => void,
    frameTime: number = 10
) {
    const start = (
        targetFloor: number,
        currentFloor: number,
        currentPosition: number,
        carState: string,
        intervalId: number,
        isContinuation: boolean
    ) => {
        let _intervalId: number = intervalId;
        let floor: number = currentFloor;
        let state: string = carState;
        let position: number = currentPosition;
        const targetPosition: number = targetFloor * 100;
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
        }

        // set in each intrval
        if (!state.includes("door-open")) {
            _intervalId = setInterval(() => {
                // manage position
                if (state.includes("go-up")) {
                    position++;
                } else if (state.includes("go-down")) {
                    position--;
                }
                getPosition(position);

                // manage floor
                if (position !== targetPosition && position % 100 === 0) {
                    if (state.includes("go-up")) {
                        floor++;
                    } else if (state.includes("go-down")) {
                        floor--;
                    }
                    getCurrentFloor(floor);
                }

                // manage door
                if (position === targetPosition) {
                    getCarState(state + "-door-open");
                }

                // clear interval
                if (
                    (position >= targetPosition && state.includes("go-up")) ||
                    (position <= targetPosition && state.includes("go-down"))
                ) {
                    clearInterval(_intervalId);
                }
            }, frameTime);

            setIntervalId(_intervalId);
        }
    };
    return start;
}
