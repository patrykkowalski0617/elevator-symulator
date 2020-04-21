import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const ShaftContext = createContext();

const ShaftContextProvider = props => {
    const { numberOfCars } = useContext(BuildingContext);
    const initArr = val => Array(numberOfCars).fill(val);

    const [allCarsCurrentFloor, setAllCarsCurrentFloor] = useState(initArr(7)); // next floor on way or floor that has been just reached, but not floor which has been just left
    const [allCarStates, setAllCarStates] = useState(initArr(null));
    const [allCarsFloorAssignments, setAllCarsFloorAssignments] = useState(
        initArr([])
    );

    return (
        <ShaftContext.Provider
            value={{
                allCarsCurrentFloor,
                setAllCarsCurrentFloor,
                allCarStates,
                setAllCarStates,
                allCarsFloorAssignments,
                setAllCarsFloorAssignments
            }}
        >
            {props.children}
        </ShaftContext.Provider>
    );
};

export default ShaftContextProvider;
