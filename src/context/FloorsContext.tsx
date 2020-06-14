import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    floorsWaitingForCar: boolean[];
    addFloorWaitingForCar: (floorNumber: number) => void;
    setFloorsWaitingForCar: (arr: boolean[]) => void;
}

export const FloorsContext = createContext({} as IContextProps);

const FloorsContextProvider = (props: { children: React.ReactNode }) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const [floorsWaitingForCar, setFloorsWaitingForCar] = useState(
        Array(numberOfFloors).fill(false)
    );

    const addFloorWaitingForCar = (floorNumber: number) => {
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
