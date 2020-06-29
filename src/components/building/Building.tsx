import React, { useContext } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import FloorsStack from "../floors_stack/FloorsStack";
import { BuildingStyled } from "./BuildingStyled";
import Shaft from "../shaft/Shaft";
import StickManForm from "../form_stickman/FormStickMan";

/**
 * TO DO
 * @Sizes to be removed and used from BuildingContext
 */
const Building: React.FC = () => {
    const { numberOfFloors, numberOfCars, creatingStickMan } = useContext(
        BuildingContext
    );

    // Sizes
    const carWidth: string = "64px";
    const floorWidth: string = ` calc((100% - ${carWidth} * ${numberOfCars}) / 2)`;

    return (
        <>
            {typeof creatingStickMan === "number" ? (
                <StickManForm floorNumber={creatingStickMan} />
            ) : null}
            <BuildingStyled>
                <FloorsStack
                    role={"enter-floor"}
                    floorWidth={floorWidth}
                ></FloorsStack>
                <Shaft
                    numberOfCars={numberOfCars}
                    carWidth={carWidth}
                    numberOfFloors={numberOfFloors}
                ></Shaft>
                <FloorsStack
                    role={"exit-floor"}
                    floorWidth={floorWidth}
                ></FloorsStack>
            </BuildingStyled>
        </>
    );
};

export default Building;
