import React, { useContext } from "react";
import styled from "styled-components";
import { BuildingContext } from "../context/BuildingContext";
import { floorColor } from "../style_mixin";

const Container = styled.div<{ stickId: number }>`
    position: absolute;
    bottom: 0;
    z-index: 1;
    left: ${props => props.stickId * 20 + 10}px;
    &:hover {
        bottom: 1px;
    }
`;

const StickManStyled = styled.div<{ color: string }>`
    width: 10px;
    height: 35px;
    &::before {
        content: "";
        width: 100%;
        display: block;
        height: 10px;
        background-color: ${props => props.color};
        border: 1px solid;
        border-radius: 100%;
    }
    &::after {
        content: "";
        background-color: #222;
        width: 100%;
        display: block;
        height: 23px;
        margin-top: 2px;
        border-radius: 5px 5px 0 0;
    }
`;

type StickManProps = {
    stickId: number;
    destination: number;
};

const StickMan = ({ stickId, destination }: StickManProps) => {
    const { numberOfFloors } = useContext(BuildingContext);

    const color = floorColor(numberOfFloors, destination);

    return (
        <Container stickId={stickId}>
            <p>{destination}</p>
            <StickManStyled color={color}></StickManStyled>
        </Container>
    );
};

export default StickMan;
