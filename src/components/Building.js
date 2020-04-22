import React, { useState, useEffect, useRef, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled from "styled-components";
import Shaft from "./Shaft";
import useElementSizeOnResize from "../customHooks/useElementSizeOnResize";
import { ShaftContext } from "../context/ShaftContext";

const BuildingStyled = styled.div`
    height: 70vh;
    width: 70vw;
    max-width: 600px;
    min-width: 320px;
    margin: 15vh auto;
    margin-top: calc(15vh + 25px);
    background: #555;
    position: relative;
    display: flex;
    flex-flow: row wrap;
`;

const Roof = styled.div`
    padding-left: 50%;
    padding-bottom: 10%; 
    position: absolute;
    right: 0;
    left: 0;
    z-index: -1000;
    &:after {
        content: "${props => props.text}";
        display: block;
        width: calc(100% - 33.33%);
        height: 0;
        margin-left: calc(-50% - 33.33% + 25px);
        border-left: 33.33% solid transparent;
        border-right: 33.33% solid transparent;
        border-bottom: 33.33% solid #992222;
        position: absolute;
        bottom: 100%;
    }
    display: none;
`;

export default function Building() {
    const { numberOfFloors, numberOfCars } = useContext(BuildingContext);
    const [buildingDOM, setBuildingDOM] = useState();
    const [buildingWidth, buildingHeight] = useElementSizeOnResize(buildingDOM);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setBuildingDOM(ref);
    }, []);

    // Sizes
    const carWidth = 10;
    const floorHeight = buildingHeight / numberOfFloors;
    const floorWidth = (100 - carWidth * numberOfCars) / 2;

    const { setAllCarsCurrentFloor } = useContext(ShaftContext);

    return (
        <>
            <BuildingStyled ref={buildingRef}>
                <Roof
                    text={`Building size: ${buildingWidth} x ${buildingHeight}`}
                ></Roof>

                <Floors
                    role={"enter-floor"}
                    floorHeight={floorHeight}
                    floorWidth={floorWidth}
                ></Floors>
                <Shaft
                    floorHeight={floorHeight}
                    numberOfCars={numberOfCars}
                    carWidth={carWidth}
                    numberOfFloors={numberOfFloors}
                ></Shaft>
                <Floors
                    role={"exit-floor"}
                    floorHeight={floorHeight}
                    floorWidth={floorWidth}
                ></Floors>
            </BuildingStyled>
            <div
                style={{
                    textAlign: "center",
                    position: "fixed",
                    bottom: "calc(15vh - 65px)",
                    width: "70%",
                    display: "flex",
                    flexWrap: "wrap",
                    transform: "translateX(-50%)",
                    margin: "0 50%"
                }}
            >
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([0, 0]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    BOTTOM
                </button>
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([4, 4]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    MID
                </button>
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([7, 7]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    TOP
                </button>
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([7, 0]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    TOP / BOTTOM
                </button>
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([0, 7]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    BOTTOM / TOP
                </button>
                <button
                    onClick={() => {
                        setAllCarsCurrentFloor([0, 4]);
                    }}
                    style={{ width: "33.33%", height: "30px" }}
                >
                    BOTTOM / MID
                </button>
            </div>
        </>
    );
}
