import React, { useContext } from "react";
import styled from "styled-components";
import { BuildingContext } from "../context/BuildingContext";
import { floorColor } from "../style_mixin";

const Container = styled.div<{
    stickId: number;
    getIn: boolean;
    numberOfPassengers: number;
    assignedCar: number | null;
    carWidth: string;
}>`
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: 0.8s
        ${props => {
            console.log(props.stickId);
            return `calc(0.2s * ${props.numberOfPassengers - props.stickId})`;
        }}
        ease-in-out left;
    left: ${props =>
        props.getIn
            ? `calc(100% + ${props.assignedCar} * ${props.carWidth} + 11px + 12 * ${props.stickId}px)`
            : `${props.stickId * 20 + 10}px`};
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
    getIn: boolean;
    numberOfPassengers: number;
    assignedCar: number | null;
};

const StickMan = ({
    stickId,
    destination,
    getIn,
    numberOfPassengers,
    assignedCar
}: StickManProps) => {
    const { numberOfFloors, carWidth } = useContext(BuildingContext);

    const color = floorColor({ numberOfFloors, floorNumber: destination });

    return (
        <Container
            stickId={stickId}
            getIn={getIn}
            numberOfPassengers={numberOfPassengers}
            assignedCar={assignedCar}
            carWidth={carWidth}
        >
            <p>{destination}</p>
            <StickManStyled color={color}></StickManStyled>
        </Container>
    );
};

export default StickMan;
