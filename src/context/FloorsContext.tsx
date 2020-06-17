import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    floorsWaitingForCar: boolean[];
    addFloorWaitingForCar: (floorNumber: number) => void;
    setFloorsWaitingForCar: (arr: boolean[]) => void;
    allStickMansDestinations: number[][];
    addAllStickMansDestinations: (
        floorNumber: number,
        howMany: number,
        destination: number
    ) => void;
}

export const FloorsContext = createContext({} as IContextProps);

const FloorsContextProvider = (props: { children: React.ReactNode }) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const [floorsWaitingForCar, setFloorsWaitingForCar] = useState(
        Array(numberOfFloors).fill(false)
    );

    const [allStickMansDestinations, setallStickMansDestinations] = useState<
        number[][]
    >(Array(numberOfFloors).fill([]));

    const addFloorWaitingForCar = (floorNumber: number) => {
        const _floorsWaitingForCar = [...floorsWaitingForCar];
        _floorsWaitingForCar.splice(floorNumber, 1, true);
        setFloorsWaitingForCar([..._floorsWaitingForCar]);
    };

    const addAllStickMansDestinations = (
        floorNumber: number,
        howMany: number,
        destination: number
    ) => {
        const _allStickMansDestinations: number[][] = [
            ...allStickMansDestinations
        ];
        const newStickMans: number[] = [];
        // push number of destinations for each new StickMan
        for (let i = 0; i < howMany; i++) {
            newStickMans.push(destination);
        }

        const replaceStickMans = newStickMans.concat(
            _allStickMansDestinations[floorNumber]
        );
        _allStickMansDestinations.splice(floorNumber, 1, replaceStickMans);

        setallStickMansDestinations([..._allStickMansDestinations]);
    };

    return (
        <FloorsContext.Provider
            value={{
                floorsWaitingForCar,
                addFloorWaitingForCar,
                setFloorsWaitingForCar,
                allStickMansDestinations,
                addAllStickMansDestinations
            }}
        >
            {props.children}
        </FloorsContext.Provider>
    );
};

export default FloorsContextProvider;
