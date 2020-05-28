import React from "react";
import styled from "styled-components";
import Car from "./Car";

export const CarShaftStyled = styled.div`
    background: #777;
    width: ${props => props.carWidth}%;
    position: relative;
    display: flex;
    align-items: flex-end;
    &::before,
    &::after {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: #222;
        content: "";
    }
    &::after {
        bottom: 0;
    }
    &::before {
        top: 0;
    }
`;

const Shaft = ({ numberOfCars, carWidth, numberOfFloors }) => {
    const renderCars = () => {
        const arr = [];
        for (let i = 0; i < numberOfCars; i++) {
            arr.push(
                <CarShaftStyled key={i} carWidth={carWidth}>
                    <Car carId={i} numberOfFloors={numberOfFloors} />
                </CarShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderCars()}</>;
};

export default Shaft;
