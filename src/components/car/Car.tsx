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
        removeCarFloorAssignment,
        addCarFloorAssignment
    } = useContext(ShaftContext);
    const floorAssignments: number[] = allCarsFloorAssignments[carId];
    const currentFloor: number = allCarsCurrentFloor[carId];
    const stickMans = allCarsStickMans[carId];
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

    // close door after some time
    useEffect(() => {
        if (allCarsState[carId].includes("door-open")) {
            setTimeout(() => {
                setCarState("ready");
                removeCarFloorAssignment(carId, currentFloor);
            }, 4500);
        }
    }, [allCarsState[carId]]);

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

    useEffect(() => {
        const _stickMansDestinations = new Set(
            stickMans.map(item => item.destination)
        );
        const stickMansDestinations = Array.from(_stickMansDestinations);
        setTimeout(() => {
            for (let i = 0; i < stickMansDestinations.length; i++) {
                const floorNumber = stickMansDestinations[i];
                addCarFloorAssignment(carId, floorNumber);
            }
        }, 1500);
    }, [stickMans]);

    return (
        <CarStyled
            numberOfFloors={numberOfFloors}
            style={{
                transform: `translateY(calc(-${carPosition}%))`
            }}
        >
            <Door left={true} carColor={carColor} carState={carState}></Door>
            <Door carColor={carColor} carState={carState}></Door>
            {stickMans.length ? (
                <StickManSet
                    data={[...stickMans].map(item => {
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
