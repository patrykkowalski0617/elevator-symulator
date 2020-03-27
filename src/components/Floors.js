import React from "react";
import styled from "styled-components";

const Floor = styled.div`
    border-bottom: 4px solid;
`;

export default function Floors({ floorHeight, numberOfFloors }) {
    const renderFloors = () => {
        const arr = [];
        for (let i = 0; i < numberOfFloors; i++) {
            arr.push(
                <Floor
                    key={i}
                    floorHeight={floorHeight}
                    numberOfFloors={numberOfFloors}
                    style={{ height: floorHeight + "px" }}
                ></Floor>
            );
        }

        return arr;
    };

    return <>{renderFloors()}</>;
}
