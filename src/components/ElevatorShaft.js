import React from "react";
import styled from "styled-components";
import Elevator from "./Elevator";

const ElevatorShaftStyled = styled.div`
    background: #777;
    width: ${props => props.elevatorWidth}%;
    border-width: 0 1px 4px 1px;
    border-style: solid;
    position: relative;
`;

const ElevatorShaft = ({
    floorHeight,
    numberOfElevators,
    elevatorWidth,
    numberOfFloors
}) => {
    const renderElevators = () => {
        const arr = [];
        for (let i = 0; i < numberOfElevators; i++) {
            arr.push(
                <ElevatorShaftStyled key={i} elevatorWidth={elevatorWidth}>
                    <Elevator
                        floorHeight={floorHeight}
                        elevatorNumber={i}
                        numberOfFloors={numberOfFloors}
                    />
                </ElevatorShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderElevators()}</>;
};

export default ElevatorShaft;
