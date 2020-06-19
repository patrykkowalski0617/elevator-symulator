import React, { useContext } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import Floor from "../floor/Floor";
import { floorColor } from "../../style_mixin";
import { FloorWrapper } from "./FloorsStyled";

type FloorsProps = {
    role: string;
    floorWidth: string;
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
                    floorColor={floorColor({
                        numberOfFloors,
                        floorNumber: numberOfFloors - i - 1
                    })}
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
