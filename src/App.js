import React from "react";
import Building from "./components/Building";
import BuildingContext from "./context/BuildingContext";
import ShaftContext from "./context/ShaftContext";

import assignFloorToCarTest from "./components/logic/assignFloorToCarTest";
assignFloorToCarTest();

function App() {
    return (
        <>
            <BuildingContext>
                <ShaftContext>
                    <Building></Building>
                </ShaftContext>
            </BuildingContext>
        </>
    );
}

export default App;
