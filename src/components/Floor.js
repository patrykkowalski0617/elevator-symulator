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
    const [noCar, setNoCar] = useState(false);
    const {
        allCarsCurrentFloor,
        allCarStates,
        addCarFloorAssignment
    } = useContext(ShaftContext);

    const call = () => {
        if (!waitingForCar) {
            setWaitingForCar(true);
            const carId = theNearestCar(
                allCarStates,
                allCarsCurrentFloor,
                floorNumber
            );

            // dont assing floor to car, if there is no available cars
            if (carId !== null) {
                addCarFloorAssignment(carId, floorNumber);
            } else {
                console.warn(
                    "There is no available car for Floor " + floorNumber
                );
                setNoCar(true);
            }
        }
    };

    const resetCall = () => {
        setWaitingForCar(false);
        setNoCar(false);
    };

    return (
        <FloorStyled floorHeight={floorHeight}>
            {role === "enter-floor" ? (
                <>
                    <button
                        style={noCar ? { background: "red" } : null}
                        data-floor-number={floorNumber}
                        onClick={e => {
                            call(e);
                        }}
                    >
                        Call car
                    </button>
                    <button
                        data-floor-number={floorNumber}
                        onClick={e => {
                            resetCall(e);
                        }}
                    >
                        reset
                    </button>
                </>
            ) : (
                ""
            )}
            {waitingForCar ? <CarLight></CarLight> : ""}
        </FloorStyled>
    );
}
