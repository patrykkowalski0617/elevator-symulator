import React, { createContext, useState } from "react";

export const BuildingContext = createContext();

const BuildingContextProvider = props => {
    const [numberOfFloors, setNumberOfFloors] = useState(8);

    return (
        <BuildingContext.Provider
            value={{
                numberOfFloors,
                setNumberOfFloors
            }}
        >
            {props.children}
        </BuildingContext.Provider>
    );
};

export default BuildingContextProvider;
