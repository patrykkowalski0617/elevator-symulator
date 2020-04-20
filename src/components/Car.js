import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import carAnimation from "../logic/carAnimation";
import Easing from "easing";

const CarStyled = styled.div`
    height: ${props => props.floorHeight - props.positionOnLoad}px;
    background: #999;
    position: absolute;
    bottom: ${props => props.positionOnLoad}px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
`;

const SpeedControl = styled.div`
    position: relative;
    height: 4px;
    background-image: linear-gradient(to right, green, #999900, #ff9900, red);
    border-bottom: 1px solid;
    opacity: ${props => (props.speed < 0.5 ? 0.5 : props.speed)};
`;

const SpeedMarkChanger = styled.div`
    width: ${props => 100 - 100 * props.speed}%;
    background: #999;
    position: absolute;
    z-index: 1000;
    right: 0;
    top: -0.5px;
    height: 5px;
`;

const DoorOpen = styled.div`
    height: 3px;
    background-color: yellow;
`;

const Car = ({ floorHeight, carId }) => {
    const {
        allCarsCurrentFloor,
        setAllCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarStates,
        setAllCarStates
    } = useContext(ShaftContext);
    const [carDOM, setCarDOM] = useState(null);
    const [speed, setSpeed] = useState(0);
    const [target, setTarget] = useState(null);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setCarDOM(ref);
    }, []);

    useEffect(() => {
        const target = allCarsFloorAssignments[carId].length
            ? Math.min.apply(Math, allCarsFloorAssignments[carId])
            : null;
        setTarget(target);
    }, [allCarsFloorAssignments, carId]);

    // TO DO:
    // 1. manage semi trgets
    // 2. prevent go down without delete reached floor
    // 3. check how to manage semi targets whe its go down
    // 4. do auto remove reached floor (after time needed to open and close doors)
    useEffect(() => {
        console.log(allCarStates[carId], allCarsCurrentFloor[carId], target);

        if (allCarStates[carId] === "go-up") {
            console.log("there is semi-target");
        }
        // if (target !== null) {
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

                const _allCarStates = allCarStates;
                _allCarStates.splice(carId, 1, null);
                setAllCarStates(_allCarStates);
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
        // carAnimation(
        //     target,
        //     floorHeight,
        //     allCarStates,
        //     setAllCarStates,
        //     setSpeed,
        //     allCarsCurrentFloor,
        //     setAllCarsCurrentFloor,
        //     carDOM,
        //     carId
        // );
    }, [allCarsCurrentFloor, carDOM, carId, floorHeight, target]);

    return (
        <CarStyled
            ref={buildingRef}
            floorHeight={floorHeight}
            positionOnLoad={-4}
            style={{ textAlign: "center" }}
        >
            <SpeedControl speed={speed}>
                <SpeedMarkChanger speed={speed} />
            </SpeedControl>
            {/* <button onClick={removeReachedFloor}>removeReachedFloor</button> */}
            <p>Tar: {String(target)}</p>
            <p>Now: {allCarsCurrentFloor[carId]}</p>
            {allCarStates[carId] === "door-open" ? <DoorOpen></DoorOpen> : null}
        </CarStyled>
    );
};

export default Car;

// useEffect(() => {
//     const _allCarsCurrentFloor = allCarsCurrentFloor;
//     _allCarsCurrentFloor.splice(carId, 1, carCurrentFloor);

//     setAllCarsCurrentFloor([..._allCarsCurrentFloor]);
// }, [carCurrentFloor]);

// useEffect(() => {
//     const _allCarStates = allCarStates;
//     _allCarStates.splice(carId, 1, carState);

//     setAllCarStates([..._allCarStates]);
// }, [carState]);

// const removeReachedFloor = () => {
//     const _floorAssignments = floorAssignments;
//     const floorAssignmentsForThisCar = destinations;
//     const index = floorAssignmentsForThisCar.indexOf(target);
//     floorAssignmentsForThisCar.splice(index, 1);

//     _floorAssignments.splice(carId, 1, floorAssignmentsForThisCar);
//     setFloorAssignments([..._floorAssignments]);

//     setCarState(null);
// };

// useEffect(() => {
//     const target = destinations.length
//         ? Math.min.apply(Math, destinations)
//         : null;
//     console.warn("set TARGET");
//     setTarget(target);
// }, [destinations, floorAssignments]);

// useEffect(() => {
//     console.log(
//         "car: " + carId,
//         "destinations ",
//         destinations,
//         "floorAssignments",
//         floorAssignments,
//         "target",
//         target,
//         "allCarStates",
//         allCarStates,
//         "carState",
//         carState
//     );
//     if (target !== null && carState === null) {
//         setStartMove(true);
//     }
// }, [allCarStates, carId, carState, destinations, floorAssignments, target]);

// useEffect(() => {
//     if (startMove) {
//         setStartMove(false);
//         carAnimation(
//             target,
//             floorHeight,
//             setCarState,
//             setSpeed,
//             carCurrentFloor,
//             setCarCurrentFloor,
//             carDOM
//         );
//     }
// }, [startMove]);
