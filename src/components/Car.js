import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { carTarget, move } from "../car_logic";
import { floorColor } from "../style_mixin";

const CarStyled = styled.div`
    text-align: center;
    width: 100%;
    height: ${props => 100 / props.numberOfFloors}%;
    background-color: #999;
    border-style: solid;
    border-color: #222;
    border-width: 2px 1px;
    position: relative;
    flex-wrap: wrap;
    margin: 0 1px;
    &::before,
    &::after {
        display: block;
        position: absolute;
        height: 2px;
        left: -1px;
        right: -1px;
        background: #222;
        content: "";
    }
    &::after {
        bottom: -4px;
    }
    &::before {
        top: -4px;
    }
`;

const Data = styled.p`
    position: absolute;
    text-align: center;
    top: -20px;
    height: 20px;
    width: 100%;
    font-size: 12px;
    color: #fff;
`;

const Door = styled.div`
    width: ${props => (props.carState.includes("door-open") ? "0%; " : "50%")};
    height: 100%;
    transition: 1s 0.2s ease-in-out width, 0.5s linear background-color;
    background-color: ${props => props.carColor};
    left: ${props => (props.left ? "0" : "")};
    right: ${props => (props.left ? "" : "0")};
    border: 0px solid rgba(0, 0, 0, 0.3);
    border-left-width: ${props => (props.left ? "" : "0.5px")};
    border-right-width: ${props => (props.left ? "0.5px" : "")};
    position: absolute;
    /* opacity: 0.85; */
`;

const Car = ({ numberOfFloors, carId }) => {
    const {
        updateCarCurrentFloor,
        updateCarState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarsState,
        reset
    } = useContext(ShaftContext);
    const floorAssignments = allCarsFloorAssignments[carId];
    const carState = allCarsState[carId];
    const currentFloor = allCarsCurrentFloor[carId];

    const [carPosition, setCarPosition] = useState(currentFloor * 100);
    const [intervalId, setIntervalId] = useState(null);
    const [carColor, setCarColor] = useState(
        floorColor(numberOfFloors, numberOfFloors - currentFloor - 1)
    );

    const getPosition = position => {
        setCarPosition(position);
    };
    const getCarState = state => {
        updateCarState(carId, state);
    };
    const getCurrentFloor = currentFloor => {
        updateCarCurrentFloor(carId, currentFloor);
        setCarColor(
            floorColor(numberOfFloors, numberOfFloors - currentFloor - 1)
        );
    };
    const currentPosition = carPosition;

    useEffect(() => {
        const targetFloor = carTarget(floorAssignments, carState);
        const start = move(
            getCarState,
            getCurrentFloor,
            getPosition,
            setIntervalId
        );

        if (floorAssignments.length && !reset) {
            const isContinuation = floorAssignments.length > 1 ? true : false;
            console.log("carId", carId);
            start(
                targetFloor,
                currentFloor,
                currentPosition,
                carState,
                intervalId,
                isContinuation
            );
        }
        // eslint-disable-next-line
    }, [floorAssignments]);

    return (
        <CarStyled
            numberOfFloors={numberOfFloors}
            style={{
                transform: `translateY(calc(-${carPosition}%))`
            }}
        >
            <Data>
                C: {carId}, T: {floorAssignments ? floorAssignments[0] : ""}
            </Data>
            <Door left={true} carColor={carColor} carState={carState}></Door>
            <Door carColor={carColor} carState={carState}></Door>
        </CarStyled>
    );
};

export default Car;
