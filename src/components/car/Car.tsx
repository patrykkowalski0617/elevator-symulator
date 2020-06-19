import React, { useState, useContext, useEffect } from "react";
import { CarStyled, Data, Door } from "./CarStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { carTarget, move } from "./logic";
import { floorColor } from "../../style_mixin";

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
