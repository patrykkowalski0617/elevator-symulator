import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { FloorsContext } from "../context/FloorsContext";
import { theNearestCar } from "../car_logic";

const FloorStyled = styled.div<{ numberOfFloors: number; floorColor: string }>`
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

type FloorProps = {
    floorNumber: number;
    numberOfFloors: number;
    role: string;
    floorColor: string;
};

const Floor = ({
    floorNumber,
    numberOfFloors,
    role,
    floorColor
}: FloorProps) => {
    const {
        allCarsState,
        allCarsCurrentFloor,
        addCarFloorAssignment,
        allCarsFloorAssignments
    } = useContext(ShaftContext);
    const { floorsWaitingForCar, addFloorWaitingForCar } = useContext(
        FloorsContext
    );
    const waitingForCar = floorsWaitingForCar[floorNumber];

    const [noCar, setNoCar] = useState(false);
    const [assignedCar, setAssignedCar] = useState<number | null>(null);

    const call = () => {
        addFloorWaitingForCar(floorNumber);
    };

    useEffect(() => {
        if (waitingForCar) {
            const carId = theNearestCar({
                allCarsState,
                allCarsCurrentFloor,
                allCarsFloorAssignments,
                floorNumber
            });
            if (carId !== null && carId !== undefined && carId >= 0) {
                addCarFloorAssignment(carId, floorNumber);
                setAssignedCar(carId);
            } else {
                setNoCar(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitingForCar]);

    return (
        <FloorStyled numberOfFloors={numberOfFloors} floorColor={floorColor}>
            {role === "enter-floor" ? (
                <>
                    <button
                        style={noCar ? { background: "red" } : {}}
                        data-floor-number={floorNumber}
                        onClick={call}
                    >
                        {!noCar ? "Call car" : "No available cars"}
                    </button>
                    {waitingForCar ? (
                        <>
                            <CarLight></CarLight>
                            <AssignedCar>
                                {assignedCar !== null
                                    ? `Car: ${assignedCar}`
                                    : ""}
                            </AssignedCar>
                        </>
                    ) : null}
                </>
            ) : null}

            {role === "exit-floor" ? <p>{floorNumber}</p> : null}
        </FloorStyled>
    );
};

export default Floor;
