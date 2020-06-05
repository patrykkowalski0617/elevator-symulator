import React, { useRef, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled from "styled-components";
import Shaft from "./Shaft";

const BuildingStyled = styled.div`
    height: 90vh;
    width: 70vw;
    overflow: hidden;
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

// const Roof = styled.div`
//     padding-left: 50%;
//     padding-bottom: 10%;
//     position: absolute;
//     right: 0;
//     left: 0;
//     z-index: -1000;
//     &:after {
//         content: "${props => props.text}";
//         display: block;
//         width: calc(100% - 25%);
//         height: 0;
//         margin-left: calc(-50% - 25% + 25px);
//         border-left: 25% solid transparent;
//         border-right: 25% solid transparent;
//         border-bottom: 25% solid #992222;
//         position: absolute;
//         bottom: 100%;
//     }
// `;

export default function Building() {
    const { numberOfFloors, numberOfCars } = useContext(BuildingContext);

    const buildingRef = useRef();

    // Sizes
    const carWidth = 10;
    const floorWidth = (100 - carWidth * numberOfCars) / 2;

    return (
        <>
            <BuildingStyled ref={buildingRef}>
                {/* <Roof></Roof> */}
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
