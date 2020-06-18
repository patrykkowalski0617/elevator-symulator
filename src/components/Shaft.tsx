import React from "react";
import styled from "styled-components";
import Car from "./Car";

export const ShaftStyled = styled.div<{ carWidth: string }>`
    background-color: #778;
    width: ${props => props.carWidth};
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

type ShaftProps = {
    numberOfCars: number;
    carWidth: string;
    numberOfFloors: number;
};

const Shaft = ({ numberOfCars, carWidth, numberOfFloors }: ShaftProps) => {
    const renderCars = () => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < numberOfCars; i++) {
            arr.push(
                <ShaftStyled key={i} carWidth={carWidth}>
                    <Car carId={i} numberOfFloors={numberOfFloors} />
                </ShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderCars()}</>;
};

export default Shaft;
