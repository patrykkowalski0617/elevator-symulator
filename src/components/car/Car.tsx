import React, { useState, useContext, useEffect } from "react";
import { CarStyled, Data, Door } from "./CarStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { FloorsContext } from "../../context/FloorsContext";
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
        console.log(direction);
        if (direction) {
            updateCarDirection(carId, direction);
        }
    }, [direction]);

    const stickMans = stickMansDestinations.map(
        (item: number, index: number) => {
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
