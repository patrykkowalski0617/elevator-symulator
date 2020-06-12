import React, { createContext, useState } from "react";

interface IContextProps {
    numberOfFloors: number;
    setNumberOfFloors: (n: number) => void;
    numberOfCars: number;
    setNnmberOfCars: (n: number) => void;
    automotion: boolean;
    setAutomotion: (b: boolean) => void;
}
export const BuildingContext = createContext({} as IContextProps);

const BuildingContextProvider = (props: { children: React.ReactNode }) => {
    const [numberOfFloors, setNumberOfFloors] = useState(11);
    const howManyCars = Math.floor(numberOfFloors / 5);
    const [numberOfCars, setNnmberOfCars] = useState(howManyCars);
    const [automotion, setAutomotion] = useState(false);

    return (
        <BuildingContext.Provider
            value={{
                numberOfFloors,
                setNumberOfFloors,
                numberOfCars,
                setNnmberOfCars,
                automotion,
                setAutomotion
            }}
        >
            {props.children}
        </BuildingContext.Provider>
    );
};

export default BuildingContextProvider;
