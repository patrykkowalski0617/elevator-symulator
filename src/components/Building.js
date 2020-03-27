import React, {
    useLayoutEffect,
    useState,
    useEffect,
    useRef,
    useContext
} from "react";
import { BuildingContext } from "../context/BuildingContext";
import Floors from "./Floors";
import styled from "styled-components";

const BuildingStyled = styled.div`
    height: 70vh;
    width: 70vw;
    max-width: 600px;
    min-width: 320px;
    margin: 15vh auto;
    margin-top: calc(15vh + 25px);
    background: #555;
    position: relative;
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
            <Floors
                numberOfFloors={numberOfFloors}
                buildingHeight={buildingHeight}
            ></Floors>
        </BuildingStyled>
    );
}
