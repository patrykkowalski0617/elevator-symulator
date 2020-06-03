import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { carTarget as getCarTarget, animation } from "../car_logic";

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
        allCarsFloorAssignments
    } = useContext(ShaftContext);
    const [carPosition, setCarPosition] = useState(0);
    const [carTargetStack, setCarTargetStack] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const target = getCarTarget(allCarsFloorAssignments, carId);
        if (target) {
            setCarTargetStack(
                [...carTargetStack, target].sort((a, b) => a - b)
            );
        }
        // eslint-disable-next-line
    }, [allCarsFloorAssignments]);

    const getPosition = position => {
        setCarPosition(position);
    };
    const getCarState = state => {
        updateCarState(carId, state);
    };
    const targetFloor = carTargetStack[0];
    const currentFloor = allCarsCurrentFloor[carId];
    const getCurrentFloor = currentFloor => {
        updateCarCurrentFloor(carId, currentFloor);
    };
    const currentPosition = carPosition;

    useEffect(() => {
        const { start } = animation(
            getCarState,
            getCurrentFloor,
            getPosition,
            updateCarState,
            setIntervalId
        );
        if (carTargetStack[0]) {
            start(
                targetFloor,
                currentFloor,
                currentPosition,
                intervalId,
                carId
            );
        }
        // eslint-disable-next-line
    }, [carTargetStack[0]]);

    return (
        <>
            <CarStyled
                numberOfFloors={numberOfFloors}
                style={{
                    transform: `translateY(calc(-${carPosition}%))`
                }}
            >
                <p>C: {carId}</p>
                <p>T: {carTargetStack[0]}</p>
                <p>N: {allCarsCurrentFloor[carId]}</p>
            </CarStyled>
        </>
    );
};

export default Car;
