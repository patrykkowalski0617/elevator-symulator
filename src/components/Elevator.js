import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Easing from "easing";

const ElevatorStyled = styled.div`
    height: ${props => props.floorHeight + 4}px;
    background: #999;
    position: absolute;
    bottom: -4px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
`;

const Elevator = ({ floorHeight }) => {
    const [moveMode, setMoveMode] = useState(0); // 0 - no move, 1 - speed up, 2 - speed constans, 3 - slow down
    const [currentFloor, setCurrentFloor] = useState(0);
    const [elevatorDOM, setElevatorDOM] = useState();

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setElevatorDOM(ref);
    }, []);

    useEffect(() => {
        const move = () => {
            const easingAmountOfFrames = 100;
            const easeIn = Easing(easingAmountOfFrames, "quadratic");
            const easeOut = Easing(easingAmountOfFrames, "sinusoidal");

            let pos = -4;
            let easingEndPos = 0;
            let id;
            let i = 0;
            let j = 0;
            const destination = 200;
            const frame = () => {
                if (pos < destination) {
                    if (easeIn[i] < 1) {
                        pos += 1 * easeIn[i];
                        i++;
                        easingEndPos = pos;
                    } else if (pos < destination - easingEndPos) {
                        pos += 1;
                    } else {
                        pos += 1 * (1 - easeOut[j]);
                        console.log(j);
                        j++;
                    }
                } else {
                    pos = destination;
                    clearInterval(id);
                    i = 0;
                }
                elevatorDOM.style.bottom = pos + "px";
            };

            id = setInterval(frame, 15);
        };

        if (moveMode === 1) {
            move();
        }
    }, [elevatorDOM, moveMode]);

    return (
        <ElevatorStyled
            ref={buildingRef}
            floorHeight={floorHeight}
            moveMode={moveMode}
        >
            <button
                style={{ background: "transparent", border: "none" }}
                onClick={() => {
                    let y = 1;
                    setMoveMode(y);
                    const x = setInterval(() => {
                        y++;
                        setMoveMode(y);
                        if (y === 4) {
                            clearInterval(x);
                            setMoveMode(0);
                        }
                    }, 1500);
                }}
            >
                move mode: {moveMode}
            </button>
        </ElevatorStyled>
    );
};

export default Elevator;
