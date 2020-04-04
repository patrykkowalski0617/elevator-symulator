import React from "react";
import Building from "./components/Building";
import BuildingContext from "./context/BuildingContext";
import ElevatorShaftContext from "./context/ElevatorShaftContext";

function App() {
    return (
        <>
            <BuildingContext>
                <ElevatorShaftContext>
                    <Building></Building>
                </ElevatorShaftContext>
            </BuildingContext>
        </>
    );
}

export default App;
