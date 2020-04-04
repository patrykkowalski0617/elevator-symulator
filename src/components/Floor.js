import React, { useState, useContext } from "react";
import styled from "styled-components";

const FloorStyled = styled.div`
    border-bottom: 4px solid;
    height: ${props => props.floorHeight}px;
`;

const ElevatorLight = styled.div`
    background: orange;
    width: 7px;
    height: 7px;
    margin: 7px 7px auto auto;
    float: right;
    border-radius: 100%;
`;

export default function Floor({ floorHeight, floorNumber, role }) {
    const [waitingForElevator, setWaitingForElevator] = useState(false);

    const onClickHandler = e => {
        if (!waitingForElevator) {
            setWaitingForElevator(true);
        }
    };

    return (
        <FloorStyled floorHeight={floorHeight}>
            {role === "enter-floor" ? (
                <button
                    data-floor-number={floorNumber}
                    onClick={e => {
                        onClickHandler(e);
                    }}
                >
                    Call elevator
                </button>
            ) : (
                ""
            )}
            {waitingForElevator ? <ElevatorLight></ElevatorLight> : ""}
        </FloorStyled>
    );
}
