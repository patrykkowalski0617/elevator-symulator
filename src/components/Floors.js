import React from "react";
import Floor from "./Floor";

export default function Floors({ buildingHeight, numberOfFloors }) {
    const renderFloors = numberOfFloors => {
        const arr = [];
        for (let i = 0; i < numberOfFloors; i++) {
            arr.push(
                <Floor
                    key={i}
                    buildingHeight={buildingHeight}
                    numberOfFloors={numberOfFloors}
                ></Floor>
            );
        }

        return arr;
    };

    return <>{renderFloors(numberOfFloors)}</>;
}
