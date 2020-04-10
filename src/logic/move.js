import Easing from "easing";

const move = (
    targetFloor,
    floorHeight,
    setDirection,
    setTargetFloor,
    setSpeed,
    carCurrentFloor,
    setCarCurrentFloor,
    carDOM
) => {
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
    const destination = floorHeight * targetFloor;

    const _direction =
        carCurrentFloor < targetFloor
            ? "up"
            : carCurrentFloor > targetFloor
            ? "down"
            : null;
    setDirection(_direction);

    const clearFrame = () => {
        posLet = destination;
        clearInterval(id);
        i = 0;
        setSpeed(easeIn[i]);
        setDirection(null);
        setTargetFloor(0);
    };

    const frame = () => {
        if (_direction === "up" && posLet < destination) {
            if (easeIn[i] < 1) {
                posLet += 1 * easeIn[i];
                i++;
                easingInEndPos = posLet;
                setSpeed(easeIn[i]);
                // "4" is temporary work around
            } else if (posLet < destination - easingInEndPos - 4) {
                posLet += 1;
            } else {
                posLet += 1 * (1 - easeOut[j]);
                j++;
                setSpeed(1 - easeOut[j]);
            }

            if (floorHeight * _currentFloor < posLet - 1) {
                _currentFloor++;
                setCarCurrentFloor(_currentFloor);
            }
        } else if (_direction === "down" && posLet > destination) {
            if (easeIn[i] < 1) {
                posLet -= 1 * easeIn[i];
                i++;
                easingInEndPos = posConst - posLet;
                setSpeed(easeIn[i]);
            } else if (posLet > destination + easingInEndPos + 4) {
                posLet -= 1;
            } else {
                posLet -= 1 * (1 - easeOut[j]);
                j++;
                setSpeed(1 - easeOut[j]);
            }

            if (floorHeight * _currentFloor > posLet + 1) {
                _currentFloor--;
                setCarCurrentFloor(_currentFloor);
            }
        } else {
            clearFrame();
        }
        carDOM.style.transform = `translateY(-${posLet}px)`;
    };

    id = setInterval(frame, 15);
};

export default move;
