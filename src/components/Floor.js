import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { theNearestCar } from "../car_logic";

const FloorStyled = styled.div`
    height: ${props => 100 / props.numberOfFloors}%;
    border-style: solid;
    border-color: #222;
    border-width: 2px 0;
    background-color: ${props => props.floorColor};
`;

const CarLight = styled.div`
    background: orange;
    width: 7px;
    height: 7px;
    margin: 7px 7px auto auto;
    float: right;
    border-radius: 100%;
`;

const AssignedCar = styled.div`
    float: right;
    margin: 2px 7px;
`;

export default function Floor({
    floorNumber,
    numberOfFloors,
    role,
    title,
    floorColor
}) {
    const {
        allCarsState,
        allCarsCurrentFloor,
        addCarFloorAssignment,
        allCarsFloorAssignments
    } = useContext(ShaftContext);

    const [waitingForCar, setWaitingForCar] = useState(false);
    const [noCar, setNoCar] = useState(false);
    const [assignedCar, setAssignedCar] = useState("none");

    const call = () => {
        setWaitingForCar(true);
        if (!waitingForCar) {
            const carId = theNearestCar(
                allCarsState,
                allCarsCurrentFloor,
                allCarsFloorAssignments,
                floorNumber
            );

            if (carId >= 0) {
                addCarFloorAssignment(carId, floorNumber);
                setAssignedCar(carId);
            } else {
                setNoCar(true);
            }
        }
    };

    return (
        <FloorStyled
            numberOfFloors={numberOfFloors}
            title={title}
            floorColor={floorColor}
        >
            {role === "enter-floor" ? (
                <>
                    <button
                        style={noCar ? { background: "red" } : null}
                        data-floor-number={floorNumber}
                        onClick={call}
                    >
                        Call car
                    </button>
                </>
            ) : null}
            {waitingForCar ? (
                <>
                    <CarLight></CarLight>
                    <AssignedCar>Assigned car: {assignedCar}</AssignedCar>
                </>
            ) : null}
            {role === "exit-floor" ? (
                <>
                    <p>{floorNumber}</p>
                    <input
                        type="checkbox"
                        style={{ width: "15px", height: "15px" }}
                    />
                </>
            ) : null}
        </FloorStyled>
    );
}
