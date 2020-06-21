import React, { useContext } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import Floor from "../floor/Floor";
import { FloorStyled } from "../floor/FloorStyled";
import { floorColor } from "../../style_mixin";
import { FloorWrapper } from "./FloorsStackStyled";

type FloorsProps = {
    role: string;
    floorWidth: string;
};

const Floors = ({ role, floorWidth }: FloorsProps) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const renderFloors = () => {
        const arr = [];
        if (role === "enter-floor") {
            for (let i = 0; i < numberOfFloors; i++) {
                arr.push(
                    <Floor
                        key={i}
                        floorNumber={numberOfFloors - i - 1}
                        numberOfFloors={numberOfFloors}
                        floorColor={floorColor({
                            numberOfFloors,
                            floorNumber: numberOfFloors - i - 1
                        })}
                    ></Floor>
                );
            }
        } else if (role === "exit-floor") {
            for (let i = 0; i < numberOfFloors; i++) {
                arr.push(
                    <FloorStyled
                        key={i}
                        numberOfFloors={numberOfFloors}
                        floorColor={floorColor({
                            numberOfFloors,
                            floorNumber: numberOfFloors - i - 1
                        })}
                    ></FloorStyled>
                );
            }
        }

        return arr;
    };

    return (
        <FloorWrapper floorWidth={floorWidth}>{renderFloors()}</FloorWrapper>
    );
};

export default Floors;
