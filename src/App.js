import React from "react";
import Building from "./components/Building";
import BuildingContext from "./context/BuildingContext";

function App() {
    return (
        <>
            <BuildingContext>
                <Building></Building>
            </BuildingContext>
        </>
    );
}

export default App;
