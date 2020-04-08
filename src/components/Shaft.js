import React from "react";
import styled from "styled-components";
import Car from "./Car";

const CarShaftStyled = styled.div`
    background: #777;
    width: ${props => props.carWidth}%;
    border-width: 0 1px 4px 1px;
    border-style: solid;
    position: relative;
`;

const Shaft = ({ floorHeight, numberOfCars, carWidth, numberOfFloors }) => {
    const renderCars = () => {
        const arr = [];
        for (let i = 0; i < numberOfCars; i++) {
            arr.push(
                <CarShaftStyled key={i} carWidth={carWidth}>
                    <Car
                        floorHeight={floorHeight}
                        carNumber={i}
                        numberOfFloors={numberOfFloors}
                    />
                </CarShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderCars()}</>;
};

export default Shaft;
