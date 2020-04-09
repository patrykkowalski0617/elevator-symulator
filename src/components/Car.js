import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import Easing from "easing";
import { ShaftContext } from "../context/ShaftContext";

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
    const { allCarsCurrentFloor, setCarCurrentFloorCon } = useContext(
        ShaftContext
    );
    const [carCurrentFloor, setCarCurrentFloor] = useState(0);
    const [direction, setDirection] = useState(null);
    const [targetFloor, setTargetFloor] = useState(3);
    const [startMove, setStartMove] = useState(false);
    const [carDOM, setCarDOM] = useState(null);
    const [speed, setSpeed] = useState(0);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setCarDOM(ref);
    }, []);

    const positionOnLoad = -4;

    useEffect(() => {
        const _allCarsCurrentFloor = allCarsCurrentFloor;
        _allCarsCurrentFloor.splice(carId, 1, carCurrentFloor);

        setCarCurrentFloorCon([..._allCarsCurrentFloor]);
    }, [carCurrentFloor, carId, setCarCurrentFloorCon]);
    console.log(direction);
    useEffect(() => {
        const move = targetFloor => {
            const easingAmountOfFrames = 100;
            const easeIn = Easing(easingAmountOfFrames, "quadratic");
            const easeOut = Easing(easingAmountOfFrames, "sinusoidal");

            let pos = floorHeight * carCurrentFloor;
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

            const frame = () => {
                if (_direction === "up") {
                    if (pos < destination) {
                        if (easeIn[i] < 1) {
                            pos += 1 * easeIn[i];
                            i++;
                            easingInEndPos = pos;
                            setSpeed(easeIn[i]);
                            // "4" is temporary work around
                        } else if (pos < destination - easingInEndPos - 4) {
                            pos += 1;
                        } else {
                            pos += 1 * (1 - easeOut[j]);
                            j++;
                            setSpeed(1 - easeOut[j]);
                        }

                        // "1" is temporary work around
                        if (floorHeight * _currentFloor < pos - 1) {
                            _currentFloor++;
                            setCarCurrentFloor(_currentFloor);
                        }
                    } else {
                        pos = destination;
                        clearInterval(id);
                        i = 0;
                        setSpeed(easeIn[i]);
                        setDirection(null);
                        setTargetFloor(0);
                    }
                } else if (_direction === "down") {
                    if (pos > destination) {
                        if (easeIn[i] < 1) {
                            pos -= 1 * easeIn[i];
                            i++;
                            easingInEndPos =
                                (allCarsCurrentFloor[carId] * floorHeight -
                                    pos) *
                                -1;
                            setSpeed(easeIn[i]);
                            // "4" is temporary work around
                        } else if (pos > destination + easingInEndPos + 4) {
                            pos -= 1;
                        } else {
                            pos -= 1 * (1 - easeOut[j]);
                            j++;
                            setSpeed(1 - easeOut[j]);
                        }

                        // "1" is temporary work around
                        if (floorHeight * _currentFloor > pos + 1) {
                            _currentFloor--;
                            setCarCurrentFloor(_currentFloor);
                        }
                    } else {
                        pos = destination;
                        clearInterval(id);
                        i = 0;
                        setSpeed(easeIn[i]);
                        setDirection(null);
                        setTargetFloor(0);
                    }
                }

                carDOM.style.transform = `translateY(-${pos}px)`;
            };

            id = setInterval(frame, 15);
        };

        if (startMove) {
            setStartMove(false);
            move(targetFloor);
        }
    }, [
        carCurrentFloor,
        carDOM,
        carId,
        floorHeight,
        startMove,
        setCarCurrentFloor
    ]);

    return (
        <CarStyled
            ref={buildingRef}
            floorHeight={floorHeight}
            positionOnLoad={positionOnLoad}
        >
            <SpeedControl speed={speed}>
                <SpeedMarkChanger speed={speed} />
            </SpeedControl>
            <button
                style={{
                    background: "transparent",
                    border: "none",
                    width: "100%"
                }}
                onClick={() => {
                    setStartMove(true);
                }}
            >
                move
            </button>
            <p style={{ textAlign: "center" }}>{allCarsCurrentFloor[carId]}</p>
        </CarStyled>
    );
};

export default Car;
