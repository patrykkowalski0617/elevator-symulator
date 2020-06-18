import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { FloorsContext } from "../context/FloorsContext";
import { BuildingContext } from "../context/BuildingContext";
import { theNearestCar } from "../car_logic";
import StickMan from "./StickMan";

const FloorStyled = styled.div<{ numberOfFloors: number; floorColor: string }>`
    height: ${props => 100 / props.numberOfFloors}%;
    border-style: solid;
    border-color: #222;
    border-width: 2px 0;
    background-color: ${props => props.floorColor};
    position: relative;
`;

const AssignedCar = styled.div`
    margin: 2px 7px;
`;

const CarInfo = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
`;

const CreateBtn = styled.button<{ waitingForCar: boolean }>`
    background-color: rgba(0, 0, 0, 0.5);
    color: ${props => (props.waitingForCar ? "orange" : "#eee")};
    font-weight: ${props => (props.waitingForCar ? "bold" : "normal")};
    opacity: 0.6;
    border: none;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.15);
        opacity: 0.8;
    }
`;

const NoCarInfo = styled.p`
    background-color: #f40;
    height: 25px;
    padding: 5px;
    font-size: 15px;
    line-height: 15px;
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
    const {
        floorsWaitingForCar,
        addFloorWaitingForCar,
        allStickMansDestinations
    } = useContext(FloorsContext);
    const stickMansDestinations: number[] =
        allStickMansDestinations[floorNumber];
    const { setCreatingStickMan } = useContext(BuildingContext);

    const waitingForCar = floorsWaitingForCar[floorNumber];

    const [noCar, setNoCar] = useState<boolean>(false);
    const [assignedCar, setAssignedCar] = useState<number | null>(null);
    const [getIn, setGetIn] = useState<boolean>(false);
    const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);

    const stickMans = stickMansDestinations.map((item, index) => (
        <StickMan
            key={index}
            stickId={index}
            destination={item}
            getIn={getIn}
            numberOfPassengers={numberOfPassengers}
        />
    ));

    useEffect(() => {
        console.log(stickMansDestinations);
        if (!waitingForCar && stickMansDestinations.length) {
            addFloorWaitingForCar(floorNumber);
        }
    }, [stickMansDestinations]);

    const onClickHandler = () => {
        setCreatingStickMan(floorNumber);
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
                        onClick={() => {
                            setGetIn(true);
                        }}
                    >
                        get in
                    </button>
                    <input
                        style={{ width: "30px" }}
                        type="number"
                        onChange={e => {
                            setNumberOfPassengers(Number(e.target.value));
                        }}
                        value={numberOfPassengers}
                    ></input>
                    <CarInfo>
                        {waitingForCar && assignedCar !== null ? (
                            <AssignedCar>Car: {assignedCar}</AssignedCar>
                        ) : null}
                        {noCar ? (
                            <NoCarInfo>No available cars</NoCarInfo>
                        ) : null}
                        <CreateBtn
                            data-floor-number={floorNumber}
                            onClick={onClickHandler}
                            waitingForCar={waitingForCar}
                        >
                            +
                        </CreateBtn>
                    </CarInfo>
                    <>{stickMans}</>
                </>
            ) : null}

            {role === "exit-floor" ? <p>{floorNumber}</p> : null}
        </FloorStyled>
    );
};

export default Floor;
