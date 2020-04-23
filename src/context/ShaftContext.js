import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const ShaftContext = createContext();

const ShaftContextProvider = props => {
    const { numberOfCars } = useContext(BuildingContext);
    const initArr = val => Array(numberOfCars).fill(val);

    const [allCarsCurrentFloor, setAllCarsCurrentFloor] = useState(initArr(4)); // next floor on way or floor that has been just reached, but not floor which has been just left
    const [allCarStates, setAllCarStates] = useState(initArr(null));
    const [allCarsFloorAssignments, setAllCarsFloorAssignments] = useState(
        initArr([])
    );

    const updateCarCurrentFloor = (carId, currentFloor) => {
        const _allCarsCurrentFloor = allCarsCurrentFloor;
        _allCarsCurrentFloor.splice(carId, 1, currentFloor);
        setAllCarsCurrentFloor(_allCarsCurrentFloor);
    };

    const updateCarState = (carId, state) => {
        const _allCarStates = allCarStates;
        _allCarStates.splice(carId, 1, state);
        setAllCarStates(_allCarStates);
    };

    const addCarFloorAssignment = (carId, floorNumber) => {
        if (carId !== null) {
            const _allCarsFloorAssignments = allCarsFloorAssignments;
            const carFloorAssignment = _allCarsFloorAssignments[carId];
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

    const removeCarFloorAssignment = (carId, floorNumber) => {
        const _allCarsFloorAssignments = allCarsFloorAssignments;
        const carFloorAssignment = _allCarsFloorAssignments[carId];
        const index = carFloorAssignment.indexOf(floorNumber);
        carFloorAssignment.splice(index, 1);
        const carFloorAssignmentUpdated = [...carFloorAssignment];
        _allCarsFloorAssignments.splice(carId, 1, carFloorAssignmentUpdated);
        setAllCarsFloorAssignments([..._allCarsFloorAssignments]);
    };

    return (
        <ShaftContext.Provider
            value={{
                allCarsCurrentFloor,
                setAllCarsCurrentFloor,
                addCarFloorAssignment,
                removeCarFloorAssignment,
                allCarStates,
                setAllCarStates,
                updateCarState,
                allCarsFloorAssignments,
                setAllCarsFloorAssignments,
                updateCarCurrentFloor
            }}
        >
            {props.children}
        </ShaftContext.Provider>
    );
};

export default ShaftContextProvider;
