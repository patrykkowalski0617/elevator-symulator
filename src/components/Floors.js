import React from "react";
import styled from "styled-components";

const Floor = styled.div`
    border-bottom: 4px solid;
    width: ${props => props.width};
`;

export default function Floors({ floorHeight, numberOfFloors, width }) {
    const renderFloors = () => {
        const arr = [];
        for (let i = 0; i < numberOfFloors; i++) {
            arr.push(
                <Floor
                    key={i}
                    floorHeight={floorHeight}
                    numberOfFloors={numberOfFloors}
                    style={{ height: floorHeight + "px" }}
                    width={width}
                ></Floor>
            );
        }

        return arr;
    };

    return <>{renderFloors()}</>;
}
