import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
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

const Car = ({ floorHeight, carId }) => {
    const {
        allCarsCurrentFloor,
        updateCarCurrentFloor,
        allCarsFloorAssignments,
        allCarStates,
        updateCarState
    } = useContext(ShaftContext);
    const [speed, setSpeed] = useState(0);
    const [target, setTarget] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [dataForContinuation, setDataContinuation] = useState(null);
    const [startPosition, setStartPosition] = useState(null);

    useEffect(() => {
        const max = allCarsFloorAssignments[carId].length
            ? Math.max.apply(Math, allCarsFloorAssignments[carId])
            : null;
        const min = allCarsFloorAssignments[carId].length
            ? Math.min.apply(Math, allCarsFloorAssignments[carId])
            : null;
        const target = [min, max];
        setTarget([...target]);
    }, [allCarsFloorAssignments, carId]);

    // TO DO:
    // 1. manage semi trgets
    // 2. prevent go down without delete reached floor
    // 3. check how to manage semi targets whe its go down
    // 4. do auto remove reached floor (after time needed to open and close doors)

    useEffect(() => {
        if (target[0] !== null) {
            const easingNumberOfFrames = 100;
            const easeIn = Easing(easingNumberOfFrames, "quadratic");
            const easeOut = Easing(easingNumberOfFrames, "sinusoidal");

            const posConst = floorHeight * allCarsCurrentFloor[carId];
            setStartPosition(posConst);

            let position;
            let easingInEndPos = 0;
            let id;
            let speedUpIncrem = 0;
            let slowDownIncrem = 0;
            let currentFloor = allCarsCurrentFloor[carId];
            let destination = floorHeight * target[0];

            // INTERVAL FRAME
            const frame = (carState, target, continuation = false) => {
                // if it is move to the up
                if (carState === "go-up" && position < destination) {
                    // speed up
                    if (easeIn[speedUpIncrem] < 1) {
                        position += 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? position - startPosition
                            : position - posConst;
                        setSpeed(easeIn[speedUpIncrem]);
                    }
                    // speed constance
                    else if (position < destination - easingInEndPos - 4) {
                        // "4" is temporary work around
                        position += 1;
                    }
                    // slow down
                    else {
                        position += 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
                    }

                    if (floorHeight * currentFloor < position - 1) {
                        currentFloor++;
                        updateCarCurrentFloor(carId, currentFloor);
                    }
                }
                // if it is move to the down
                else if (carState === "go-down" && position > destination) {
                    // speed up
                    if (easeIn[speedUpIncrem] < 1) {
                        position -= 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? startPosition - position
                            : posConst - position;
                        setSpeed(easeIn[speedUpIncrem]);
                    }
                    // speed constance
                    else if (position > destination + easingInEndPos + 4) {
                        position -= 1;
                    }
                    // slow down
                    else {
                        position -= 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
                    }

                    if (floorHeight * currentFloor > position + 1) {
                        currentFloor--;
                        updateCarCurrentFloor(carId, currentFloor);
                    }
                } else {
                    clearFrame();
                }
                setDataContinuation({
                    position,
                    speedUpIncrem,
                    slowDownIncrem
                });
            };

            // CLEAR INTERVAL FRAME
            const clearFrame = () => {
                position = destination;
                clearInterval(id);
                speedUpIncrem = 0;
                setSpeed(easeIn[speedUpIncrem]);
                updateCarState(carId, null);
            };

            // SET INTERVAL
            // when is stopped
            if (allCarStates[carId] === null) {
                position = posConst;
                const carState =
                    allCarsCurrentFloor[carId] < target[0]
                        ? "go-up"
                        : allCarsCurrentFloor[carId] > target[0]
                        ? "go-down"
                        : null;
                console.log(carState);
                updateCarState(carId, carState);

                const _target =
                    carState === "go-up"
                        ? target[0]
                        : carState === "go-down"
                        ? target[1]
                        : console.warn("catch the exception");
                id = setInterval(() => {
                    frame(carState, _target);
                }, 15);
                setIntervalId(id);
            }
            // when car is going up
            else if (allCarStates[carId] === "go-up") {
                clearInterval(intervalId);
                position = dataForContinuation.position;
                speedUpIncrem = dataForContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-up", target[0], true);
                }, 15);
                setIntervalId(id);
            }
            // when car is going down
            else if (allCarStates[carId] === "go-down") {
                clearInterval(intervalId);
                destination = floorHeight * target[1];
                position = dataForContinuation.position;
                speedUpIncrem = dataForContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-down", null, true);
                }, 15);
                setIntervalId(id);
            } else {
                console.warn("catch the exception");
            }
        }
    }, [allCarsCurrentFloor, carId, floorHeight, target]);

    return (
        <CarStyled
            floorHeight={floorHeight}
            positionOnLoad={-4}
            style={{
                textAlign: "center",
                transform: `translateY(-${
                    dataForContinuation
                        ? dataForContinuation.position
                            ? dataForContinuation.position
                            : floorHeight * allCarsCurrentFloor[carId]
                        : null
                }px)`
            }}
        >
            <SpeedControl speed={speed}>
                <SpeedMarkChanger speed={speed} />
            </SpeedControl>
            {/* <button onClick={removeReachedFloor}>removeReachedFloor</button> */}
            <p>T: {String(target)}</p>
            <p>Now: {allCarsCurrentFloor[carId]}</p>
        </CarStyled>
    );
};

export default Car;
