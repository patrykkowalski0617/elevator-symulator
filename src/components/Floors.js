import React, { useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import styled from "styled-components";
import Floor from "./Floor";
import { floorColor } from "../style_mixin";

const FloorWrapper = styled.div`
    width: ${props => props.floorWidth}%;
    border-style: solid;
    background: #555;
    border-width: 0 2px;
`;
export default function Floors({ role, floorWidth }) {
    const { numberOfFloors } = useContext(BuildingContext);

    const renderFloors = () => {
        const arr = [];
        for (let i = 0; i < numberOfFloors; i++) {
            arr.push(
                <Floor
                    key={i}
                    role={role}
                    floorNumber={numberOfFloors - i - 1}
                    numberOfFloors={numberOfFloors}
                    floorColor={floorColor(numberOfFloors, i)}
                ></Floor>
            );
        }

        return arr;
    };

    return (
        <FloorWrapper floorWidth={floorWidth} role={role}>
            {renderFloors()}
        </FloorWrapper>
    );
}
