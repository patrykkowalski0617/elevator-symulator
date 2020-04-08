import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ElevatorShaftContext } from "../context/ElevatorShaftContext";

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
    const { elevatorCurrenFloorCon } = useContext(ElevatorShaftContext);

    const theNearestElevatorNum = arrData => {
        let min = Number.POSITIVE_INFINITY;
        let theNearestElevatorNum = null;

        for (let i = 0; i < arrData.length; i++) {
            let distanceToFloor = arrData[i].distanceToFloor;
            let elevatorNumber = arrData[i].elevatorNumber;

            if (distanceToFloor < min) {
                theNearestElevatorNum = elevatorNumber;
            }
            min = distanceToFloor < min ? distanceToFloor : min;
        }

        return theNearestElevatorNum;
    };

    const onClickHandler = e => {
        if (!waitingForElevator) {
            setWaitingForElevator(true);
            // find the nearest Elevator
            // console.log(floorNumber, elevatorCurrenFloorCon);
            // create arr of objects {elNum, elDistance}
            const distancesToElevators = elevatorCurrenFloorCon.map(
                (item, index) => {
                    return {
                        elevatorNumber: index,
                        distanceToFloor: Math.abs(floorNumber - item)
                    };
                }
            );

            console.log(theNearestElevatorNum(distancesToElevators));
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
