import React, { useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled from "styled-components";
import Shaft from "./Shaft";
import StickManForm from "./StickManForm";

const BuildingStyled = styled.div`
    height: 90vh;
    width: 70vw;
    max-width: 600px;
    min-width: 320px;
    margin: 5vh auto;
    background: #000;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    border-style: solid;
    border-width: 6px 4px;
`;
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
                <Floors role={"enter-floor"} floorWidth={floorWidth}></Floors>
                <Shaft
                    numberOfCars={numberOfCars}
                    carWidth={carWidth}
                    numberOfFloors={numberOfFloors}
                ></Shaft>
                <Floors role={"exit-floor"} floorWidth={floorWidth}></Floors>
            </BuildingStyled>
        </>
    );
};

export default Building;
