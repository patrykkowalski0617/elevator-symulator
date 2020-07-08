import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    floorsWaitingForCar: { up: boolean; down: boolean }[];
    addFloorWaitingForCar: (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => void;
}

export const FloorsContext = createContext({} as IContextProps);

const FloorsContextProvider = (props: { children: React.ReactNode }) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const [floorsWaitingForCar, setFloorsWaitingForCar] = useState(
        Array(numberOfFloors).fill({ up: false, down: false })
    );

    const addFloorWaitingForCar = (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => {
        const _floorsWaitingForCar = [...floorsWaitingForCar];
        _floorsWaitingForCar.splice(floorNumber, 1, data);
        setFloorsWaitingForCar([..._floorsWaitingForCar]);
    };

    return (
        <FloorsContext.Provider
            value={{
                floorsWaitingForCar,
                addFloorWaitingForCar
            }}
        >
            {props.children}
        </FloorsContext.Provider>
    );
};

export default FloorsContextProvider;
