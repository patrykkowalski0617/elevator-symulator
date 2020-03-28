import React, { useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import styled from "styled-components";

const FloorWrapper = styled.div`
    width: ${props => props.floorWidth}%;
    border-style: solid;
    border-width: ${props =>
        props.role === "enter-floor"
            ? "0 1px 0 2px"
            : props.role === "exit-floor"
            ? "0 2px 0 1px"
            : ""};
`;

const Floor = styled.div`
    border-bottom: 4px solid;
    height: ${props => props.floorHeight}px;
`;

export default function Floors({ role, floorHeight, floorWidth }) {
    const { numberOfFloors } = useContext(BuildingContext);

    const renderFloors = () => {
        const arr = [];
        for (let i = 0; i < numberOfFloors; i++) {
            arr.push(<Floor key={i} floorHeight={floorHeight}></Floor>);
        }

        return arr;
    };

    return (
        <FloorWrapper floorWidth={floorWidth} role={role}>
            {renderFloors()}
        </FloorWrapper>
    );
}
