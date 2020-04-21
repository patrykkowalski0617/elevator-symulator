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
        setAllCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarStates,
        setAllCarStates
    } = useContext(ShaftContext);
    const [speed, setSpeed] = useState(0);
    const [target, setTarget] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [dataContinuation, setDataContinuation] = useState(null);
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

            let posLet;
            let easingInEndPos = 0;
            let id;
            let speedUpIncrem = 0;
            let slowDownIncrem = 0;
            let currentFloor = allCarsCurrentFloor[carId];
            const destination = floorHeight * target[0];

            const clearFrame = () => {
                posLet = destination;
                clearInterval(id);
                speedUpIncrem = 0;
                setSpeed(easeIn[speedUpIncrem]);

                const _allCarStates = allCarStates;
                _allCarStates.splice(carId, 1, null);
                setAllCarStates(_allCarStates);
            };

            const frame = (carState, continuation = false) => {
                // if it is move to the up
                if (carState === "go-up" && posLet < destination) {
                    // speed up
                    if (easeIn[speedUpIncrem] < 1) {
                        posLet += 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? posLet - startPosition
                            : posLet - posConst;
                        setSpeed(easeIn[speedUpIncrem]);
                        // speed constance
                    } else if (posLet < destination - easingInEndPos - 4) {
                        // "4" is temporary work around
                        posLet += 1;
                        // slow down
                    } else {
                        posLet += 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
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
                    if (easeIn[speedUpIncrem] < 1) {
                        posLet -= 1 * easeIn[speedUpIncrem];
                        speedUpIncrem++;
                        easingInEndPos = continuation
                            ? startPosition - posLet
                            : posConst - posLet;
                        setSpeed(easeIn[speedUpIncrem]);
                        // speed constance
                    } else if (posLet > destination + easingInEndPos + 4) {
                        posLet -= 1;
                        // slow down
                    } else {
                        posLet -= 1 * (1 - easeOut[slowDownIncrem]);
                        slowDownIncrem++;
                        setSpeed(1 - easeOut[slowDownIncrem]);
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
                setDataContinuation({
                    posLet,
                    speedUpIncrem,
                    slowDownIncrem
                });
            };

            if (allCarStates[carId] === "go-up") {
                clearInterval(intervalId);
                posLet = dataContinuation.posLet;
                speedUpIncrem = dataContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-up", true);
                }, 15);
                setIntervalId(id);
            } else if (allCarStates[carId] === null) {
                posLet = posConst;
                const carState =
                    allCarsCurrentFloor[carId] < target[0]
                        ? "go-up"
                        : allCarsCurrentFloor[carId] > target[0]
                        ? "go-down"
                        : null;
                const _allCarStates = allCarStates;
                _allCarStates.splice(carId, 1, carState);
                setAllCarStates(_allCarStates);
                id = setInterval(() => {
                    frame(carState);
                }, 15);
                setIntervalId(id);
            } else if (allCarStates[carId] === "go-down") {
                console.log("GO DOWN");
                clearInterval(intervalId);
                posLet = dataContinuation.posLet;
                speedUpIncrem = dataContinuation.speedUpIncrem;
                id = setInterval(() => {
                    frame("go-down", true);
                }, 15);
                setIntervalId(id);
            } else {
                console.log("CHECK EXCEPTION HERE");
            }
        }
    }, [allCarsCurrentFloor, carId, floorHeight, target]);

    useEffect(() => {
        console.log("target is changed", target);
    }, [target]);

    return (
        <CarStyled
            floorHeight={floorHeight}
            positionOnLoad={-4}
            style={{
                textAlign: "center",
                transform: `translateY(-${
                    dataContinuation
                        ? dataContinuation.posLet
                            ? dataContinuation.posLet
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
