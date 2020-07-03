import React, { useState, useContext, useEffect } from "react";
import { CarStyled, Door } from "./CarStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { FloorsContext } from "../../context/FloorsContext";
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
        allCarsStickMansDestinations,
        updateCarDirection
    } = useContext(ShaftContext);
    const { floorsWaitingForCar } = useContext(FloorsContext);
    const floorAssignments: number[] = allCarsFloorAssignments[carId];
    const currentFloor: number = allCarsCurrentFloor[carId];
    const stickMansDestinations: number[] = allCarsStickMansDestinations[carId];

    const [carPosition, setCarPosition] = useState<number>(currentFloor * 100);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [carColor, setCarColor] = useState<string>(
        floorColor({ numberOfFloors, floorNumber: carPosition })
    );
    const [carState, setCarState] = useState<string>(allCarsState[carId]);
    const [carCurrentFloor, setCarCurrentFloor] = useState<number>(0);
    const [direction, setDirection] = useState<string | null>(null);

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

        for (
            let floorNumber = 0;
            floorNumber < floorsWaitingForCar.length;
            floorNumber++
        ) {
            const { up, down } = floorsWaitingForCar[floorNumber];
            if (floorNumber === targetFloor) {
                if (up && !down) {
                    setDirection("up");
                } else if (down) {
                    setDirection("down");
                }
            }
        }
    }, [floorAssignments]);

    useEffect(() => {
        if (direction) {
            updateCarDirection(carId, direction);
        }
    }, [direction]);

    return (
        <CarStyled
            numberOfFloors={numberOfFloors}
            style={{
                transform: `translateY(calc(-${carPosition}%))`
            }}
        >
            <Door left={true} carColor={carColor} carState={carState}></Door>
            <Door carColor={carColor} carState={carState}></Door>
            <StickManSet
                lifeState={[`in-car-${carId}`]}
                stickMansDestinations={stickMansDestinations}
            />
        </CarStyled>
    );
};

export default Car;
