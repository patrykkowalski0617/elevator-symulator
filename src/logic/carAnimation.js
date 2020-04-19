import Easing from "easing";

const carAnimation = (
    target,
    floorHeight,
    // setDirection,
    setSpeed,
    carCurrentFloor,
    // setCarCurrentFloor,
    carDOM
) => {
    if (target !== null) {
        const easingNumberOfFrames = 100;
        const easeIn = Easing(easingNumberOfFrames, "quadratic");
        const easeOut = Easing(easingNumberOfFrames, "sinusoidal");

        const posConst = floorHeight * carCurrentFloor;
        let posLet = posConst;
        let easingInEndPos = 0;
        let id;
        let i = 0;
        let j = 0;
        let _currentFloor = carCurrentFloor;
        const destination = floorHeight * target;

        const _carState =
            carCurrentFloor < target
                ? "go-up"
                : carCurrentFloor > target
                ? "go-down"
                : null;
        // setDirection(_carState);

        const clearFrame = () => {
            posLet = destination;
            clearInterval(id);
            i = 0;
            setSpeed(easeIn[i]);
            // setDirection("door-open");
        };

        const frame = () => {
            // if it is move to the up
            if (_carState === "go-up" && posLet < destination) {
                // speed up
                if (easeIn[i] < 1) {
                    posLet += 1 * easeIn[i];
                    i++;
                    easingInEndPos = posLet - posConst;
                    setSpeed(easeIn[i]);
                    // speed constance
                } else if (posLet < destination - easingInEndPos - 4) {
                    // "4" is temporary work around
                    posLet += 1;
                    // slow down
                } else {
                    posLet += 1 * (1 - easeOut[j]);
                    j++;
                    setSpeed(1 - easeOut[j]);
                }

                if (floorHeight * _currentFloor < posLet - 1) {
                    _currentFloor++;
                    // setCarCurrentFloor(_currentFloor);
                }
                // if it is move to the down
            } else if (_carState === "go-down" && posLet > destination) {
                // speed up
                if (easeIn[i] < 1) {
                    posLet -= 1 * easeIn[i];
                    i++;
                    easingInEndPos = posConst - posLet;
                    setSpeed(easeIn[i]);
                    // speed constance
                } else if (posLet > destination + easingInEndPos + 4) {
                    posLet -= 1;
                    // slow down
                } else {
                    posLet -= 1 * (1 - easeOut[j]);
                    j++;
                    setSpeed(1 - easeOut[j]);
                }

                if (floorHeight * _currentFloor > posLet + 1) {
                    _currentFloor--;
                    // setCarCurrentFloor(_currentFloor);
                }
            } else {
                clearFrame();
            }
            carDOM.style.transform = `translateY(-${posLet}px)`;
        };

        id = setInterval(frame, 15);
    }
};

export default carAnimation;
