import React, { useState, useEffect, useRef, useContext } from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled, { css } from "styled-components";
import Elevators from "./Elevators";
import useElementSizeOnResize from "../customHooks/useElementSizeOnResize";

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
        width: calc(100% - 50px);
        height: 0;
        margin-left: calc(-50% - 50px + 25px);
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 50px solid #992222;
        position: absolute;
        bottom: 100%;
    }
`;

const FloorsCommonCss = floorWidth => css`
    width: ${floorWidth}%;
    border-style: solid;
`;

const EnterFloors = styled.div`
    ${props => FloorsCommonCss(props.floorWidth)}
    border-width: 0 1px 0 2px;
`;
const ExitFloors = styled.div`
    ${props => FloorsCommonCss(props.floorWidth)}
    border-width: 0 2px 0 1px;
`;

export default function Building() {
    const { numberOfFloors, numberOfElevators } = useContext(BuildingContext);
    const [buildingDOM, setBuildingDOM] = useState();
    const [buildingWidth, buildingHeight] = useElementSizeOnResize(buildingDOM);

    const buildingRef = useRef();

    useEffect(() => {
        const ref = buildingRef.current;
        setBuildingDOM(ref);
    }, []);

    const floorHeight = buildingHeight / numberOfFloors;
    const elevatorWidth = 10;
    const floorWidth = (100 - elevatorWidth * numberOfElevators) / 2;

    return (
        <BuildingStyled ref={buildingRef}>
            <Roof
                text={`Building size: ${buildingWidth} x ${buildingHeight}`}
            ></Roof>
            <EnterFloors floorWidth={floorWidth}>
                <Floors
                    numberOfFloors={numberOfFloors}
                    floorHeight={floorHeight}
                ></Floors>
            </EnterFloors>
            <Elevators
                floorHeight={floorHeight}
                numberOfElevators={numberOfElevators}
                elevatorWidth={elevatorWidth}
            ></Elevators>
            <ExitFloors floorWidth={floorWidth}>
                <Floors
                    numberOfFloors={numberOfFloors}
                    floorHeight={floorHeight}
                ></Floors>
            </ExitFloors>
        </BuildingStyled>
    );
}
