import React from "react";
import Building from "./components/Building";
import BuildingContext from "./context/BuildingContext";
import ShaftContext from "./context/ShaftContext";
import FloorsContext from "./context/FloorsContext";

function App() {
    return (
        <>
            <BuildingContext>
                <ShaftContext>
                    <FloorsContext>
                        <Building></Building>
                    </FloorsContext>
                </ShaftContext>
            </BuildingContext>
        </>
    );
}

export default App;
