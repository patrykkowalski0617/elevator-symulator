import React, { createContext, useState, useContext, useEffect } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    allCarsCurrentFloor: number[];
    updateCarCurrentFloor: (carId: number, currentFloor: number) => void;
    allCarsFloorAssignments: number[][];
    addCarFloorAssignment: (carId: number, floorNumber: number) => void;
    removeCarFloorAssignment: (carId: number, floorNumber: number) => void;
    allCarsState: string[];
    updateCarState: (carId: number, state: string) => void;
    allCarsStickMans: {
        lifeState: string;
        destination: number;
        carId: number | null;
        placeInCar: number | null;
    }[][];
    addPassengers: (
        data: {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    ) => void;
    allCarsDirection: string | null[];
    updateCarDirection: (carId: number, direction: string) => void;
}

export const ShaftContext = createContext({} as IContextProps);

const ShaftContextProvider = (props: { children: React.ReactNode }) => {
    const { numberOfCars } = useContext(BuildingContext);
    const initArr = (val: any) => Array(numberOfCars).fill(val);

    // next floor on way or floor that has been just reached, but not floor which has been just left
    const [allCarsCurrentFloor, setAllCarsCurrentFloor] = useState(initArr(0));
    // ready, go-up, go-down, go-up-door-open, go-down-door-open
    const [allCarsState, setAllCarsState] = useState(initArr("ready"));
    const [allCarsFloorAssignments, setAllCarsFloorAssignments] = useState(
        initArr([])
    );
    const [allCarsStickMans, setAllCarsStickMans] = useState(initArr([]));
    const [allCarsDirection, setAllCarsDirection] = useState(initArr(null));

    const updateCarCurrentFloor = (carId: number, currentFloor: number) => {
        const _allCarsCurrentFloor = [...allCarsCurrentFloor];
        _allCarsCurrentFloor.splice(carId, 1, currentFloor);
        setAllCarsCurrentFloor([..._allCarsCurrentFloor]);
    };

    const updateCarState = (carId: number, state: string) => {
        const _allCarsState = [...allCarsState];
        _allCarsState.splice(carId, 1, state);
        setAllCarsState([..._allCarsState]);
    };

    const addCarFloorAssignment = (carId: number, floorNumber: number) => {
        if (carId !== null) {
            const _allCarsFloorAssignments = [...allCarsFloorAssignments];
            const carFloorAssignment = [..._allCarsFloorAssignments[carId]];
            const carFloorAssignmentUpdated = [
                ...carFloorAssignment,
                floorNumber
            ];
            _allCarsFloorAssignments.splice(
                carId,
                1,
                carFloorAssignmentUpdated
            );
            setAllCarsFloorAssignments([..._allCarsFloorAssignments]);
        }
    };

    const [_allCarsStickMans, set_allCarsStickMans] = useState(
        allCarsStickMans
    );
    useEffect(() => {
        set_allCarsStickMans(allCarsStickMans);
    }, [allCarsStickMans]);
    const addPassengers = (
        data: {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    ) => {
        if (data[0]) {
            const carId =
                typeof data[0].carId === "number" ? data[0].carId : -1;
            if (allCarsStickMans[carId].length < 4) {
                const carPassengers = [..._allCarsStickMans[carId], ...data];
                _allCarsStickMans.splice(carId, 1, carPassengers);
                setAllCarsStickMans([..._allCarsStickMans]);
            } else {
                console.warn("car is full!");
            }
        } else {
            console.warn(
                "there are no stickmen on this floor who have the same direction as the car!"
            );
        }
    };

    const removeCarFloorAssignment = (carId: number, floorNumber: number) => {
        const _allCarsFloorAssignments = [...allCarsFloorAssignments];
        const carFloorAssignment = [..._allCarsFloorAssignments[carId]];
        const index = carFloorAssignment.indexOf(floorNumber);
        carFloorAssignment.splice(index, 1);
        const carFloorAssignmentUpdated = [...carFloorAssignment];
        _allCarsFloorAssignments.splice(carId, 1, carFloorAssignmentUpdated);
        setAllCarsFloorAssignments([..._allCarsFloorAssignments]);
    };

    const updateCarDirection = (carId: number, direction: string) => {
        const _allCarsDirection = allCarsDirection;
        _allCarsDirection.splice(carId, 1, direction);
        setAllCarsDirection([..._allCarsDirection]);
    };

    return (
        <ShaftContext.Provider
            value={{
                allCarsCurrentFloor,
                updateCarCurrentFloor,
                allCarsFloorAssignments,
                addCarFloorAssignment,
                removeCarFloorAssignment,
                allCarsState,
                updateCarState,
                allCarsStickMans,
                addPassengers,
                allCarsDirection,
                updateCarDirection
            }}
        >
            {props.children}
        </ShaftContext.Provider>
    );
};

export default ShaftContextProvider;
