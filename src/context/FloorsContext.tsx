import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    floorsWaitingForCar: { up: boolean; down: boolean }[];
    addFloorWaitingForCar: (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => void;
    allFloorsStickMansDestinations: number[][];
    addAllFloorsStickMansDestinations: (
        floorNumber: number,
        howMany: number,
        destination: number
    ) => void;
}

export const FloorsContext = createContext({} as IContextProps);

const FloorsContextProvider = (props: { children: React.ReactNode }) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const [floorsWaitingForCar, setFloorsWaitingForCar] = useState(
        Array(numberOfFloors).fill({ up: false, down: false })
    );
    const [
        allFloorsStickMansDestinations,
        setAllFloorsStickMansDestinations
    ] = useState<number[][]>(Array(numberOfFloors).fill([]));

    const addFloorWaitingForCar = (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => {
        const _floorsWaitingForCar = [...floorsWaitingForCar];
        _floorsWaitingForCar.splice(floorNumber, 1, data);
        setFloorsWaitingForCar([..._floorsWaitingForCar]);
    };

    const addAllFloorsStickMansDestinations = (
        floorNumber: number,
        howMany: number,
        destination: number
    ) => {
        const _allFloorsStickMansDestinations: number[][] = [
            ...allFloorsStickMansDestinations
        ];
        const newStickMans: number[] = [];
        // push number of destinations for each new StickMan
        for (let i = 0; i < howMany; i++) {
            newStickMans.push(destination);
        }

        const replaceStickMans = newStickMans.concat(
            _allFloorsStickMansDestinations[floorNumber]
        );
        _allFloorsStickMansDestinations.splice(
            floorNumber,
            1,
            replaceStickMans
        );

        setAllFloorsStickMansDestinations([..._allFloorsStickMansDestinations]);
    };

    return (
        <FloorsContext.Provider
            value={{
                floorsWaitingForCar,
                addFloorWaitingForCar,
                allFloorsStickMansDestinations,
                addAllFloorsStickMansDestinations
            }}
        >
            {props.children}
        </FloorsContext.Provider>
    );
};

export default FloorsContextProvider;
