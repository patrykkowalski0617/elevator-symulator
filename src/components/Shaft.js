import React, { useContext } from "react";
import styled from "styled-components";
import Car from "./Car";
import { ShaftContext } from "../context/ShaftContext";

const CarShaftStyled = styled.div`
    background: #777;
    width: ${props => props.carWidth}%;
    border-width: 0 1px 4px 1px;
    border-style: solid;
    position: relative;
`;

const Shaft = ({ floorHeight, numberOfCars, carWidth, numberOfFloors }) => {
    const { floorAssignments } = useContext(ShaftContext);

    const renderCars = () => {
        const arr = [];
        for (let i = 0; i < numberOfCars; i++) {
            arr.push(
                <CarShaftStyled key={i} carWidth={carWidth}>
                    <Car
                        floorHeight={floorHeight}
                        carId={i}
                        numberOfFloors={numberOfFloors}
                        floorAssignment={floorAssignments[i]}
                    />
                </CarShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderCars()}</>;
};

export default Shaft;
