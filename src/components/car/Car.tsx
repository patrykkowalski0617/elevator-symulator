import React, { useState, useContext, useEffect } from "react";
import { CarStyled, Door } from "./CarStyled";
import { ShaftContext } from "../../context";
import { carTarget, move } from "./logic";
import { floorColor } from "../../style_mixin";
import StickManSet from "../stickman_set/StickManSet";

type CarProps = { numberOfFloors: number; carId: number };

const Car = ({ numberOfFloors, carId }: CarProps) => {
    const {
        updateCarCurrentFloor,
        updateCarState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        allCarsState,
        allCarsStickMans,
        allCarsDirection
    } = useContext(ShaftContext);
    const floorAssignments: number[] = allCarsFloorAssignments[carId];
    const currentFloor: number = allCarsCurrentFloor[carId];

    const [carPosition, setCarPosition] = useState<number>(currentFloor * 100);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [carColor, setCarColor] = useState<string>(
        floorColor({ numberOfFloors, floorNumber: carPosition })
    );
    const [carState, setCarState] = useState<string>(allCarsState[carId]);
    const [carCurrentFloor, setCarCurrentFloor] = useState<number>(0);

    const getPosition = (position: number) => {
        setCarPosition(position);
    };
    const getCarState = (state: string) => {
        setCarState(state);
    };
    const getCurrentFloor = (currentFloor: number) => {
        setCarCurrentFloor(currentFloor);
        setCarColor(
            floorColor({
                numberOfFloors,
                floorNumber: currentFloor
            })
        );
    };

    useEffect(() => {
        updateCarCurrentFloor(carId, carCurrentFloor);
    }, [carCurrentFloor]);

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
    }, [floorAssignments]);

    return (
        <CarStyled
            numberOfFloors={numberOfFloors}
            style={{
                transform: `translateY(calc(-${carPosition}%))`
            }}
        >
            <Door left={true} carColor={carColor} carState={carState}></Door>
            <Door carColor={carColor} carState={carState}></Door>
            {allCarsStickMans[carId].length ? (
                <StickManSet
                    data={allCarsStickMans[carId].map(item => {
                        const {
                            lifeState,
                            destination,
                            carId,
                            placeInCar
                        } = item;
                        return { lifeState, destination, carId, placeInCar };
                    })}
                />
            ) : null}
        </CarStyled>
    );
};

export default Car;
