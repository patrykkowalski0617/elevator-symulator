import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const ShaftContext = createContext();

const ShaftContextProvider = props => {
    const { numberOfCars } = useContext(BuildingContext);
    const initArr = val => Array(numberOfCars).fill(val);

    const [allCarsCurrentFloor, setCarCurrentFloorCon] = useState(initArr(0)); // next floor on way or floor that has been just reached, but not floor which has been just left

    return (
        <ShaftContext.Provider
            value={{
                allCarsCurrentFloor,
                setCarCurrentFloorCon
            }}
        >
            {props.children}
        </ShaftContext.Provider>
    );
};

export default ShaftContextProvider;
