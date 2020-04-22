import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import Easing from "easing";

const CarStyled = styled.div`
    height: ${props => props.floorHeight - props.positionLetOnLoad}px;
    background: #999;
    position: absolute;
    bottom: ${props => props.positionLetOnLoad}px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
    text-align: center;
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

const Door = styled.div`
    background-color: red;
    width: 100%;
    height: 3px;
    opacity: 0;
    ${props =>
        props.open
            ? "width: 0%; transition: 3s linear width; opacity: 1"
            : null}
`;

const frameIntervalTime = 5;

const Car = ({ floorHeight, carId }) => {
    const {
        allCarsCurrentFloor,
        updateCarCurrentFloor,
        allCarsFloorAssignments,
        removeCarFloorAssignment,
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

    useEffect(() => {
        if (target[0] !== null) {
            const easingNumberOfFrames = 100;
            const easeIn = Easing(easingNumberOfFrames, "quadratic");
            const easeOut = Easing(easingNumberOfFrames, "sinusoidal");

            const positionConst = floorHeight * allCarsCurrentFloor[carId];
            setStartPosition(positionConst);

            let positionLet;
            let easingInEndPos = 0;
            let id;
            let speedUpIncrem = 0;
            let slowDownIncrem = 0;
            let currentFloor = allCarsCurrentFloor[carId];
            let destination = floorHeight * target[0];

            // INTERVAL FRAME
            const frame = (carState, continuation = false) => {
                // if it is move to the up
                if (carState === "go-up" && positionLet < destination) {
                    // speed up
                    if (easeIn[speedUpIncrem] < 1) {
                        positionLet += 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? positionLet - startPosition
                            : positionLet - positionConst;
                        setSpeed(easeIn[speedUpIncrem]);
                    }
                    // speed constance
                    else if (positionLet < destination - easingInEndPos - 4) {
                        // "4" is temporary work around
                        positionLet += 1;
                    }
                    // slow down
                    else {
                        positionLet += 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
                    }

                    if (floorHeight * currentFloor < positionLet - 1) {
                        currentFloor++;
                        updateCarCurrentFloor(carId, currentFloor);
                    }
                }
                // if it is move to the down
                else if (carState === "go-down" && positionLet > destination) {
                    // speed up
                    if (easeIn[speedUpIncrem] < 1) {
                        positionLet -= 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? startPosition - positionLet
                            : positionConst - positionLet;
                        setSpeed(easeIn[speedUpIncrem]);
                    }
                    // speed constance
                    else if (positionLet > destination + easingInEndPos + 4) {
                        positionLet -= 1;
                    }
                    // slow down
                    else {
                        positionLet -= 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
                    }

                    if (floorHeight * currentFloor > positionLet + 1) {
                        currentFloor--;
                        updateCarCurrentFloor(carId, currentFloor);
                    }
                } else {
                    clearFrame();
                }
                setDataContinuation({
                    positionLet,
                    speedUpIncrem,
                    slowDownIncrem
                });
            };

            // CLEAR INTERVAL FRAME
            const clearFrame = () => {
                positionLet = destination;
                clearInterval(id);
                speedUpIncrem = 0;
                setSpeed(easeIn[speedUpIncrem]);
                if (target[0] !== undefined) {
                    updateCarState(carId, "door-open");
                    setTimeout(() => {
                        console.log("close the door");
                        removeCarFloorAssignment(
                            carId,
                            allCarsCurrentFloor[carId]
                        );
                        updateCarState(carId, null);
                    }, 3000);
                }
            };

            // SET INTERVAL
            // when is stopped
            if (allCarStates[carId] === null) {
                positionLet = positionConst;

                const carState =
                    allCarsCurrentFloor[carId] < target[1]
                        ? "go-up"
                        : allCarsCurrentFloor[carId] > target[0]
                        ? "go-down"
                        : null;
                updateCarState(carId, carState);

                id = setInterval(() => {
                    frame(carState);
                }, frameIntervalTime);
                setIntervalId(id);
            }
            // when car is going up
            else if (allCarStates[carId] === "go-up") {
                clearInterval(intervalId);
                positionLet = dataForContinuation.positionLet;
                speedUpIncrem = dataForContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-up", true);
                }, frameIntervalTime);
                setIntervalId(id);
            }
            // when car is going down
            else if (allCarStates[carId] === "go-down") {
                clearInterval(intervalId);
                destination = floorHeight * target[1];
                positionLet = dataForContinuation.positionLet;
                speedUpIncrem = dataForContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-down", true);
                }, frameIntervalTime);
                setIntervalId(id);
            } else {
                console.warn("catch the exception");
            }
        }
    }, [allCarsCurrentFloor, carId, floorHeight, target]);

    return (
        <CarStyled
            floorHeight={floorHeight}
            positionLetOnLoad={-4}
            style={{
                transform: `translateY(-${
                    dataForContinuation
                        ? dataForContinuation.positionLet
                            ? dataForContinuation.positionLet
                            : floorHeight * allCarsCurrentFloor[carId]
                        : null
                }px)`
            }}
        >
            <SpeedControl speed={speed}>
                <SpeedMarkChanger speed={speed} />
            </SpeedControl>
            <p>T: {String(target)}</p>
            <p>Now: {allCarsCurrentFloor[carId]}</p>
            <Door
                open={allCarStates[carId] === "door-open" ? true : false}
            ></Door>
        </CarStyled>
    );
};

export default Car;
