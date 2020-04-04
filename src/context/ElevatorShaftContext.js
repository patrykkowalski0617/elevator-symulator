import React, { createContext, useState } from "react";

export const ElevatorShaftContext = createContext();

const ElevatorShaftContextProvider = props => {
    const [elevatorsLocation, setElevatorsLocation] = useState([]);

    return (
        <ElevatorShaftContext.Provider
            value={{ elevatorsLocation, setElevatorsLocation }}
        >
            {props.children}
        </ElevatorShaftContext.Provider>
    );
};

export default ElevatorShaftContextProvider;
