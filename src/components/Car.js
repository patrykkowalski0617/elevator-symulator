import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { carTarget, move } from "../car_logic";

const CarStyled = styled.div`
    text-align: center;
    width: 100%;
    height: ${props => 100 / props.numberOfFloors}%;
    background: #999;
    padding: 3px 0 0 0;
    border-style: solid;
    border-color: #222;
    border-width: 2px 1px;
    position: relative;
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

const Car = ({ numberOfFloors, carId }) => {
    const {
        updateCarCurrentFloor,
        updateCarState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarsState
    } = useContext(ShaftContext);
    const floorAssignments = allCarsFloorAssignments[carId];
    const carState = allCarsState[carId];
    const currentFloor = allCarsCurrentFloor[carId];

    const [carPosition, setCarPosition] = useState(currentFloor * 100);
    const [intervalId, setIntervalId] = useState(null);

    const getPosition = position => {
        setCarPosition(position);
    };
    const getCarState = state => {
        updateCarState(carId, state);
    };

    const getCurrentFloor = currentFloor => {
        updateCarCurrentFloor(carId, currentFloor);
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
        if (floorAssignments.length) {
            const isContinuation = floorAssignments.length ? false : true;
            start(
                targetFloor,
                currentFloor,
                currentPosition,
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
            <p>ID: {carId}</p>
            <p>T: {floorAssignments ? floorAssignments[0] : ""}</p>
            <p>C: {currentFloor}</p>
        </CarStyled>
    );
};

export default Car;
