import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const FloorsContext = createContext();

const FloorsContextProvider = props => {
    const { numberOfFloors } = useContext(BuildingContext);

    const [floorsWaitingForCar, setFloorsWaitingForCar] = useState(
        Array(numberOfFloors).fill(false)
    );

    const addFloorWaitingForCar = floorNumber => {
        const _floorsWaitingForCar = [...floorsWaitingForCar];
        _floorsWaitingForCar.splice(floorNumber, 1, true);
        setFloorsWaitingForCar([..._floorsWaitingForCar]);
    };

    return (
        <FloorsContext.Provider
            value={{
                floorsWaitingForCar,
                addFloorWaitingForCar,
                setFloorsWaitingForCar
            }}
        >
            {props.children}
        </FloorsContext.Provider>
    );
};

export default FloorsContextProvider;
