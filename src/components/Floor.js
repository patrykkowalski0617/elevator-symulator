import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import theNearestCar from "../logic/theNearestCar";

const FloorStyled = styled.div`
    border-bottom: 4px solid;
    height: ${props => props.floorHeight}px;
`;

const CarLight = styled.div`
    background: orange;
    width: 7px;
    height: 7px;
    margin: 7px 7px auto auto;
    float: right;
    border-radius: 100%;
`;

export default function Floor({ floorHeight, floorNumber, role }) {
    const [waitingForCar, setWaitingForCar] = useState(false);
    const {
        allCarsCurrentFloor,
        allCarStates,
        updateCarFloorAssignments
    } = useContext(ShaftContext);

    const onClickHandler = () => {
        if (!waitingForCar) {
            setWaitingForCar(true);
            const carId = theNearestCar(
                allCarStates,
                allCarsCurrentFloor,
                floorNumber
            );

            // dont assing floor to car, if there is no available cars
            if (carId !== null) {
                updateCarFloorAssignments(carId, floorNumber);
            } else {
                console.warn("There is no available car.");
            }
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
                    Call car
                </button>
            ) : (
                ""
            )}
            {waitingForCar ? <CarLight></CarLight> : ""}
        </FloorStyled>
    );
}
