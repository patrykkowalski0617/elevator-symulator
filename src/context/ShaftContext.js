import React, { createContext, useState, useContext } from "react";
import { BuildingContext } from "./BuildingContext";

export const ShaftContext = createContext();

const ShaftContextProvider = props => {
    const { numberOfCars } = useContext(BuildingContext);
    const initArr = val => Array(numberOfCars).fill(val);

    const [carCurrenFloorCon, setCarCurrenFloorCon] = useState(initArr(0)); // next floor on way or floor that has been just reached, but not floor which has been just left

    // console.log(carCurrenFloorCon);

    return (
        <ShaftContext.Provider
            value={{
                carCurrenFloorCon,
                setCarCurrenFloorCon
            }}
        >
            {props.children}
        </ShaftContext.Provider>
    );
};

export default ShaftContextProvider;
