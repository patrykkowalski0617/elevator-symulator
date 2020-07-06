import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

interface IContextProps {
    floorsWaitingForCar: { up: boolean; down: boolean }[];
    addFloorWaitingForCar: (
        floorNumber: number,
        data: { up: boolean; down: boolean }
    ) => void;
    allFloorsStickMansDestinations: number[][];
    addStickMansDestinations: (
        floorNumber: number,
        howMany: number,
        destination: number
    ) => void;
    removeStickMansDestinations: (
        floorNumber: number,
        indexes: number[]
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

    const addStickMansDestinations = (
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

    const removeStickMansDestinations = (
        floorNumber: number,
        indexes: number[]
    ) => {
        const _allFloorsStickMansDestinations: number[][] = [
            ...allFloorsStickMansDestinations
        ];
        const stickMansDestinations: number[] =
            _allFloorsStickMansDestinations[floorNumber];

        const newStickMansDestinations: number[] = [];

        for (let i = 0; i < stickMansDestinations.length; i++) {
            if (!indexes.includes(i)) {
                newStickMansDestinations.push(stickMansDestinations[i]);
            }
        }

        _allFloorsStickMansDestinations.splice(
            floorNumber,
            1,
            newStickMansDestinations
        );
        console.log(_allFloorsStickMansDestinations);
        setAllFloorsStickMansDestinations([..._allFloorsStickMansDestinations]);
    };

    return (
        <FloorsContext.Provider
            value={{
                floorsWaitingForCar,
                addFloorWaitingForCar,
                allFloorsStickMansDestinations,
                addStickMansDestinations,
                removeStickMansDestinations
            }}
        >
            {props.children}
        </FloorsContext.Provider>
    );
};

export default FloorsContextProvider;
