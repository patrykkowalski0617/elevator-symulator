import React from "react";

export default function Floor({ buildingHeight, numberOfFloors }) {
    return <div style={{ height: buildingHeight / numberOfFloors }}></div>;
}
