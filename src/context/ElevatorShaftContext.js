import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const ElevatorShaftContext = createContext();

const ElevatorShaftContextProvider = props => {
    const { numberOfElevators } = useContext(BuildingContext);
    const initArr = val => Array(numberOfElevators).fill(val);

    const [elevatorCurrenFloorCon, setElevatorCurrenFloorCon] = useState(
        initArr(0)
    ); // next floor on way or floor that has been just reached, but not floor which has been just left

    return (
        <ElevatorShaftContext.Provider
            value={{
                elevatorCurrenFloorCon,
                setElevatorCurrenFloorCon
            }}
        >
            {props.children}
        </ElevatorShaftContext.Provider>
    );
};

export default ElevatorShaftContextProvider;
