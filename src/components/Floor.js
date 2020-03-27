import React from "react";
import styled from "styled-components";

const FloorStyled = styled.div`
    border-bottom: 4px solid;
`;

export default function Floor({ buildingHeight, numberOfFloors }) {
    return (
        <FloorStyled
            style={{ height: buildingHeight / numberOfFloors }}
        ></FloorStyled>
    );
}
