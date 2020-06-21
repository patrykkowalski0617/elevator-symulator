import React, { useState, useContext, useEffect } from "react";
import { CarStyled, Data, Door } from "./CarStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { carTarget, move } from "./logic";
import { floorColor } from "../../style_mixin";
import StickMan from "../stickman/StickMan";

type CarProps = { numberOfFloors: number; carId: number };

const Car = ({ numberOfFloors, carId }: CarProps) => {
    const {
        updateCarCurrentFloor,
        updateCarState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarsState,
        allCarsStickMansDestinations
    } = useContext(ShaftContext);
    const floorAssignments: number[] = allCarsFloorAssignments[carId];
    const currentFloor: number = allCarsCurrentFloor[carId];
    const stickMansDestinations: number[] = allCarsStickMansDestinations[carId];

    const [carPosition, setCarPosition] = useState<number>(currentFloor * 100);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [carColor, setCarColor] = useState<string>(
        floorColor({ numberOfFloors, floorNumber: carPosition })
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
                floorNumber: currentFloor
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

    const stickMans = stickMansDestinations.map(
        (item: number, index: number) => {
            const assignedCar = null;
            return (
                <StickMan
                    key={index}
                    stickId={index}
                    destination={item}
                    getIn={false}
                    numberOfPassengers={1}
                    assignedCar={0}
                    place={"car"}
                />
            );
        }
    );

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
            {stickMans}
            <Door left={true} carColor={carColor} carState={carState}></Door>
            <Door carColor={carColor} carState={carState}></Door>
        </CarStyled>
    );
};

export default Car;
