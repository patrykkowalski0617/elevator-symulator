import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { carTarget, move } from "../car_logic";
import { floorColor } from "../style_mixin";

const CarStyled = styled.div<{ numberOfFloors: number }>`
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

const Door = styled.div<{ carState: string; carColor: string; left?: boolean }>`
    width: ${props => (props.carState.includes("door-open") ? "5px; " : "50%")};
    height: 100%;
    transition: 1s 0.2s ease-in-out width, 0.8s linear background-color;
    background-color: ${props => props.carColor};
    left: ${props => (props.left ? "0" : "")};
    right: ${props => (props.left ? "" : "0")};
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-left-width: ${props => (props.left ? "" : "0.5px")};
    border-right-width: ${props => (props.left ? "0.5px" : "")};
    position: absolute;
    opacity: 0.9;
`;

type CarProps = { numberOfFloors: number; carId: number };

const Car = ({ numberOfFloors, carId }: CarProps) => {
    const {
        updateCarCurrentFloor,
        updateCarState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarsState
    } = useContext(ShaftContext);
    const floorAssignments: number[] = allCarsFloorAssignments[carId];
    const currentFloor: number = allCarsCurrentFloor[carId];

    const [carPosition, setCarPosition] = useState<number>(currentFloor * 100);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [carColor, setCarColor] = useState<string>(
        floorColor({ numberOfFloors, floorNumber: currentFloor, s: 36, l: 29 })
    );
    const [carState, setCarState] = useState<string>(allCarsState[carId]);

    const getPosition = (position: number) => {
        setCarPosition(position);
    };
    const getCarState = (state: string) => {
        setCarState(state);
    };
    const getCurrentFloor = (currentFloor: number) => {
        updateCarCurrentFloor(carId, currentFloor);
        setCarColor(
            floorColor({
                numberOfFloors,
                floorNumber: currentFloor,
                s: 36,
                l: 29
            })
        );
    };
    const currentPosition: number = carPosition;
    const targetFloor: number | undefined = carTarget(
        floorAssignments,
        carState
    );
    const start = move(
        getCarState,
        getCurrentFloor,
        getPosition,
        setIntervalId
    );

    useEffect(() => {
        updateCarState(carId, carState);
        // eslint-disable-next-line
    }, [carState]);

    useEffect(() => {
        if (floorAssignments.length) {
            const isContinuation = floorAssignments.length > 1 ? true : false;
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
