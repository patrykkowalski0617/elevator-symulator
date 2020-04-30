import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { distanceToAvailableCars, theNearestCar } from "./logic";

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
    const {
        allCarsState,
        allCarsCurrentFloor,
        addCarFloorAssignment
    } = useContext(ShaftContext);
    const [waitingForCar, setWaitingForCar] = useState(false);
    const [noCar, setNoCar] = useState(false);

    const call = () => {
        setWaitingForCar(true);
        if (!waitingForCar) {
            const carId = theNearestCar(
                distanceToAvailableCars(
                    allCarsState,
                    allCarsCurrentFloor,
                    floorNumber
                )
            );
            if (carId !== null) {
                addCarFloorAssignment(carId, floorNumber);
            } else {
                setNoCar(true);
            }
        }
    };

    return (
        <>
            {/* <FloorStyled floorHeight={floorHeight}> */}
            {role === "enter-floor" ? (
                <>
                    <button
                        style={noCar ? { background: "red" } : null}
                        data-floor-number={floorNumber}
                        onClick={call}
                    >
                        Call car
                    </button>
                    <button data-floor-number={floorNumber} onClick={() => {}}>
                        reset
                    </button>
                </>
            ) : null}
            {waitingForCar ? <CarLight></CarLight> : null}
            {role === "exit-floor" ? (
                <>
                    <p>{floorNumber}</p>
                    <input
                        type="checkbox"
                        style={{ width: "35px", height: "35px" }}
                    />
                </>
            ) : null}
            {/* </FloorStyled> */}
        </>
    );
}
