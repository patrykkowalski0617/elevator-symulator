import React, { useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import styled from "styled-components";
import Floor from "./Floor";
import { floorColor } from "../style_mixin";

const FloorWrapper = styled.div<{ floorWidth: number }>`
    width: ${props => props.floorWidth}%;
    border-style: solid;
    background: #555;
    border-width: 0 2px;
`;

type FloorsProps = {
    role: string;
    floorWidth: number;
};

const Floors = ({ role, floorWidth }: FloorsProps) => {
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
                    floorColor={floorColor(
                        numberOfFloors,
                        numberOfFloors - i - 1
                    )}
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
};

export default Floors;
