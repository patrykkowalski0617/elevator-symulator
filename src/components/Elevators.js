import React, { useState } from "react";
import styled from "styled-components";

const ElevatorShaft = styled.div`
    background: #777;
    width: ${props => props.elevatorWidth}%;
    border-width: 0 1px 4px 1px;
    border-style: solid;
    position: relative;
`;

const ElevatorStyled = styled.div`
    height: ${props => props.floorHeight}px;
    background: #999;
    position: absolute;
    bottom: -1px;
    width: 100%;
    border-width: 1px 0;
    border-style: solid;
    transition: 5s linear;
    ${props => (props.moveMode === 1 ? "bottom: 100%" : "")}
`;

const Elevator = ({ floorHeight }) => {
    const [moveMode, setMoveMode] = useState(0); // 0 - no move, 1 - speed up, 2 - speed constans, 3 - slow down

    const moveManager = () => {
        let _moveMode = moveMode;
        if (_moveMode < 3) {
            _moveMode++;
        } else {
            _moveMode = 0;
        }

        setMoveMode(_moveMode);
    };
    return (
        <ElevatorStyled floorHeight={floorHeight} moveMode={moveMode}>
            <button
                onClick={e => {
                    moveManager();
                }}
            >
                move mode: {moveMode}
            </button>
        </ElevatorStyled>
    );
};

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
