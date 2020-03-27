import React from "react";
import styled from "styled-components";

const ElevatorShaft = styled.div`
    background: #777;
    width: ${props => props.elevatorWidth}%;
    border-width: 0 1px 4px 1px;
    border-style: solid;
    position: relative;
`;

const Elevator = styled.div`
    height: ${props => props.floorHeight}px;
    background: #999;
    position: absolute;
    bottom: -1px;
    width: 100%;
    border-width: 1px 0;
    border-style: solid;
`;

const Elevators = ({ floorHeight, numberOfElevators, elevatorWidth }) => {
    const renderElevators = () => {
        const arr = [];
        for (let i = 0; i < numberOfElevators; i++) {
            arr.push(
                <ElevatorShaft key={i} elevatorWidth={elevatorWidth}>
                    <Elevator floorHeight={floorHeight} />
                </ElevatorShaft>
            );
        }

        return arr;
    };

    return <>{renderElevators()}</>;
};

export default Elevators;
