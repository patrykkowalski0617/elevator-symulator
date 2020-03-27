import React, {
    useLayoutEffect,
    useState,
    useEffect,
    useRef,
    useContext
} from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled, { css } from "styled-components";

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

const FloorsCommonCss = css`
    width: 40%;
`;

const EnterFloors = styled.div`
    ${FloorsCommonCss}
    border-width: 0 1px 0 2px;
    border-style: solid;
`;
const ExitFloors = styled.div`
    ${FloorsCommonCss}
    border-width: 0 2px 0 1px;
    border-style: solid;
`;

const ElevatorShaft = styled.div`
    background: #777;
    width: 10%;
    border-width: 0 1px;
    border-style: solid;
`;

function useElementSize(el) {
    const [size, setSize] = useState([0, 0]);
    const [element, setElement] = useState(null);

    if (el && element === null) {
        setElement(el);
    }

    useLayoutEffect(() => {
        function updateSize() {
            if (element) {
                setSize([element.clientWidth, element.clientHeight]);
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [element]);

    return size;
}

export default function Building() {
    const { numberOfFloors } = useContext(BuildingContext);
    const [buildingDOM, setBuildingDOM] = useState();
    const [width, buildingHeight] = useElementSize(buildingDOM);

    const buildingRef = useRef();

    useEffect(() => {
        const ref = buildingRef.current;
        setBuildingDOM(ref);
    }, []);

    return (
        <BuildingStyled ref={buildingRef}>
            <Roof text={`Building size: ${width} x ${buildingHeight}`}></Roof>
            <EnterFloors>
                <Floors
                    numberOfFloors={numberOfFloors}
                    buildingHeight={buildingHeight}
                ></Floors>
            </EnterFloors>
            <ElevatorShaft></ElevatorShaft>
            <ElevatorShaft></ElevatorShaft>
            <ExitFloors>
                <Floors
                    numberOfFloors={numberOfFloors}
                    buildingHeight={buildingHeight}
                ></Floors>
            </ExitFloors>
        </BuildingStyled>
    );
}
