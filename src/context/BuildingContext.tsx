import React, { createContext, useState } from "react";

interface IContextProps {
    numberOfFloors: number;
    setNumberOfFloors: (n: number) => void;
    numberOfCars: number;
    setNnmberOfCars: (n: number) => void;
    automotion: boolean;
    setAutomotion: (b: boolean) => void;
    creatingStickMan: number | null;
    setCreatingStickMan: (floorNumber: number | null) => void;
    carWidth: string;
    floorWidth: string;
}

export const BuildingContext = createContext({} as IContextProps);

const BuildingContextProvider = (props: { children: React.ReactNode }) => {
    const [numberOfFloors, setNumberOfFloors] = useState(11);
    const howManyCars = Math.floor(numberOfFloors / 5);
    const [numberOfCars, setNnmberOfCars] = useState(howManyCars);
    const [automotion, setAutomotion] = useState(false);
    const [creatingStickMan, setCreatingStickMan] = useState<number | null>(
        null
    );

    const carWidth: string = "64px";
    const floorWidth: string = ` calc((100% - ${carWidth} * ${numberOfCars}) / 2)`;

    return (
        <BuildingContext.Provider
            value={{
                numberOfFloors,
                setNumberOfFloors,
                numberOfCars,
                setNnmberOfCars,
                automotion,
                setAutomotion,
                creatingStickMan,
                setCreatingStickMan,
                carWidth,
                floorWidth
            }}
        >
            {props.children}
        </BuildingContext.Provider>
    );
};

export default BuildingContextProvider;
