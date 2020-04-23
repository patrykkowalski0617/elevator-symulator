import React, { createContext, useState } from "react";

export const BuildingContext = createContext();

const BuildingContextProvider = props => {
    const [numberOfFloors, setNumberOfFloors] = useState(8);
    const [numberOfCars, setNnmberOfCars] = useState(2);
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
