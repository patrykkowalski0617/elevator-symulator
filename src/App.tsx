import React from "react";
import Building from "./components/building/Building";
import BuildingContext from "./context/BuildingContext";
import ShaftContext from "./context/ShaftContext";

const App: React.FC = () => {
    return (
        <BuildingContext>
            <ShaftContext>
                <Building />
            </ShaftContext>
        </BuildingContext>
    );
};

export default App;
