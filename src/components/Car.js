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

const Car = ({ floorHeight, carNumber }) => {
    const { carCurrenFloorCon, setCarCurrenFloorCon } = useContext(
        ShaftContext
    );
    const [carCurrenFloor, setCarCurrenFloor] = useState(0);

    const [isMoving, setIsMoving] = useState(false);
    const [carDOM, setCarDOM] = useState(null);
    const [speed, setSpeed] = useState(0);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setCarDOM(ref);
    }, []);

    const positionOnLoad = -4;

    useEffect(() => {
        const _carCurrenFloorCon = carCurrenFloorCon;
        _carCurrenFloorCon.splice(carNumber, 1, carCurrenFloor);

        setCarCurrenFloorCon([..._carCurrenFloorCon]);
        // }, [carCurrenFloor, carCurrenFloorCon, carNumber, setCarCurrenFloorCon]);
        // at the moment I cannot find better solution. carCurrenFloorCon cannot be included below
    }, [carCurrenFloor, carNumber, setCarCurrenFloorCon]);

    useEffect(() => {
        const move = targetFloor => {
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
            const destination = floorHeight * targetFloor;
            const frame = () => {
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

                    if (floorHeight * _currentFloor < pos - 1) {
                        _currentFloor++;

                        // THIS MAKES NUMBERS CRAZY
                        // const _carCurrenFloorCon = carCurrenFloorCon;
                        // _carCurrenFloorCon.splice(
                        //     carNumber,
                        //     1,
                        //     _currentFloor
                        // );

                        // setCarCurrenFloorCon([..._carCurrenFloorCon]);

                        setCarCurrenFloor(_currentFloor);
                    }
                } else {
                    pos = destination;
                    clearInterval(id);
                    i = 0;
                    setSpeed(easeIn[i]);
                }

                carDOM.style.transform = `translateY(-${pos}px)`;
            };

            id = setInterval(frame, 15);
        };

        if (isMoving) {
            setIsMoving(false);
            move(2);
        }
    }, [
        carCurrenFloor,
        carDOM,
        carNumber,
        floorHeight,
        isMoving,
        setCarCurrenFloor
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
                    setIsMoving(true);
                }}
            >
                move
            </button>
            <p style={{ textAlign: "center" }}>
                {carCurrenFloorCon[carNumber]}
            </p>
        </CarStyled>
    );
};

export default Car;
