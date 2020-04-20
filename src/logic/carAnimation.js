import Easing from "easing";

const carAnimation = (
    target,
    floorHeight,
    allCarStates,
    setAllCarStates,
    setSpeed,
    allCarsCurrentFloor,
    setAllCarsCurrentFloor,
    carDOM,
    carId
) => {
    // console.log(allCarStates[carId], allCarsCurrentFloor[carId], target);
    if (target !== null && allCarStates[carId] !== "go-up") {
        const easingNumberOfFrames = 100;
        const easeIn = Easing(easingNumberOfFrames, "quadratic");
        const easeOut = Easing(easingNumberOfFrames, "sinusoidal");

        const posConst = floorHeight * allCarsCurrentFloor[carId];
        let posLet = posConst;
        let easingInEndPos = 0;
        let id;
        let i = 0;
        let j = 0;
        let currentFloor = allCarsCurrentFloor[carId];
        const destination = floorHeight * target;

        const carState =
            allCarsCurrentFloor[carId] < target
                ? "go-up"
                : allCarsCurrentFloor[carId] > target
                ? "go-down"
                : null;
        const _allCarStates = allCarStates;
        _allCarStates.splice(carId, 1, carState);
        setAllCarStates(_allCarStates);

        const clearFrame = () => {
            posLet = destination;
            clearInterval(id);
            i = 0;
            setSpeed(easeIn[i]);

            // const _allCarStates = allCarStates;
            // _allCarStates.splice(carId, 1, "door-open");
            // setAllCarStates(_allCarStates);

            // setTimeout(() => {
            const _allCarStates = allCarStates;
            _allCarStates.splice(carId, 1, null);
            setAllCarStates(_allCarStates);
            // }, 500);
        };

        const frame = () => {
            // if it is move to the up
            if (carState === "go-up" && posLet < destination) {
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

                if (floorHeight * currentFloor < posLet - 1) {
                    currentFloor++;

                    const _allCarsCurrentFloor = allCarsCurrentFloor;
                    _allCarsCurrentFloor.splice(carId, 1, currentFloor);
                    setAllCarsCurrentFloor(_allCarsCurrentFloor);
                }
                // if it is move to the down
            } else if (carState === "go-down" && posLet > destination) {
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

                if (floorHeight * currentFloor > posLet + 1) {
                    currentFloor--;

                    const _allCarsCurrentFloor = allCarsCurrentFloor;
                    _allCarsCurrentFloor.splice(carId, 1, currentFloor);
                    setAllCarsCurrentFloor(_allCarsCurrentFloor);
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
