import React, { useRef, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled from "styled-components";
import Shaft from "./Shaft";

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

export default function Building() {
    const { numberOfFloors, numberOfCars } = useContext(BuildingContext);

    const buildingRef = useRef();

    // Sizes
    const carWidth = 10;
    const floorWidth = (100 - carWidth * numberOfCars) / 2;

    return (
        <>
            <BuildingStyled ref={buildingRef}>
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
}
