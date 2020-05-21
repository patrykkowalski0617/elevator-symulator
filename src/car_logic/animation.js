export default function animation(numberOfFloors) {
    const frameTime = 15;
    let position = 0;
    let state = "state";
    const frame = numberOfFloors => {
        position++;
    };

    const start = (targetFloor, getState, getPosition) => {
        const intervalId = setInterval(() => {
            frame(numberOfFloors);
            if (position % 100 === 0) {
                getState(state);
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
