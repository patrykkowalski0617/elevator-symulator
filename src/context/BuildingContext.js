import React, { createContext, useState } from "react";

export const BuildingContext = createContext();

const BuildingContextProvider = props => {
    const [numberOfFloors, setNumberOfFloors] = useState(8);
    const [numberOfElevators, setNnmberOfElevators] = useState(2);

    return (
        <BuildingContext.Provider
            value={{
                numberOfFloors,
                setNumberOfFloors,
                numberOfElevators,
                setNnmberOfElevators
            }}
        >
            {props.children}
        </BuildingContext.Provider>
    );
};

export default BuildingContextProvider;
