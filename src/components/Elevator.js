import React, { useState } from "react";
import styled from "styled-components";

const ElevatorStyled = styled.div`
    height: ${props => props.floorHeight + 4}px;
    background: #999;
    position: absolute;
    bottom: -4px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
`;

const Elevator = ({ floorHeight }) => {
    const [moveMode, setMoveMode] = useState(0); // 0 - no move, 1 - speed up, 2 - speed constans, 3 - slow down
    const [currentFloor, setCurrentFloor] = useState(0);

    return (
        <ElevatorStyled floorHeight={floorHeight} moveMode={moveMode}>
            <button
                style={{ background: "transparent", border: "none" }}
                onClick={() => {
                    let y = 1;
                    setMoveMode(y);
                    const x = setInterval(() => {
                        y++;
                        setMoveMode(y);
                        if (y === 4) {
                            clearInterval(x);
                            setMoveMode(0);
                        }
                    }, 650);
                }}
            >
                move mode: {moveMode}
            </button>
        </ElevatorStyled>
    );
};

export default Elevator;
