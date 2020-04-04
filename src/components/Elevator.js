import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Easing from "easing";

const ElevatorStyled = styled.div`
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
    height: 2px;
    background-image: linear-gradient(to right, green, #009966, #ff9900, red);
    opacity: ${props => (props.speed < 0.5 ? 0.5 : props.speed)};
`;

const SpeedMarkChanger = styled.div`
    width: ${props => 100 - 100 * props.speed}%;
    background: #999;
    position: absolute;
    z-index: 1000;
    right: 0;
    top: -0.5px;
    height: 3px;
`;

const Elevator = ({ floorHeight, elevatorNumber, numberOfFloors }) => {
    const [isMoving, setIsMoving] = useState(false);
    const [elevatorDOM, setElevatorDOM] = useState(null);
    const [currentFloor, setCurrentFloor] = useState(0);
    const [speed, setSpeed] = useState(0);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setElevatorDOM(ref);
    }, []);

    const positionOnLoad = -4;

    useEffect(() => {
        const move = () => {
            console.log("move");
            const easingAmountOfFrames = 100;
            const easeIn = Easing(easingAmountOfFrames, "quadratic");
            const easeOut = Easing(easingAmountOfFrames, "sinusoidal");

            let pos = 0;
            let easingInEndPos = 0;
            let id;
            let i = 0;
            let j = 0;
            let _currentFloor = 0;
            const destination = floorHeight * 2;
            const frame = () => {
                if (pos < destination) {
                    if (easeIn[i] < 1) {
                        pos += 1 * easeIn[i];
                        i++;
                        easingInEndPos = pos;
                        setSpeed(easeIn[i]);
                    } else if (pos < destination - easingInEndPos - 4) {
                        pos += 1;
                    } else {
                        pos += 1 * (1 - easeOut[j]);
                        j++;
                        setSpeed(1 - easeOut[j]);
                    }
                } else {
                    pos = destination;
                    clearInterval(id);
                    i = 0;
                    setSpeed(easeIn[i]);
                }

                if (floorHeight * _currentFloor < pos - 1) {
                    _currentFloor++;
                    setCurrentFloor(_currentFloor);
                }
                elevatorDOM.style.transform = `translateY(-${pos}px)`;
            };

            id = setInterval(frame, 15);
        };

        if (isMoving) {
            setIsMoving(false);
            move();
        }
    }, [currentFloor, elevatorDOM, floorHeight, isMoving]);

    return (
        <ElevatorStyled
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
                    setIsMoving(true);
                }}
            >
                move
            </button>
            <p style={{ textAlign: "center" }}>{currentFloor}</p>
        </ElevatorStyled>
    );
};

export default Elevator;
