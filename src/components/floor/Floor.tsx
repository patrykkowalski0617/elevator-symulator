import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
    AssignedCar,
    CarInfo,
    CreateBtn,
    NoCarInfo,
    Light
} from "./FloorStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { FloorsContext } from "../../context/FloorsContext";
import { BuildingContext } from "../../context/BuildingContext";
import { theNearestCar } from "../car/logic";
import StickMan from "../stickman/StickMan";

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
            assignedCar={assignedCar}
        />
    ));

    useEffect(() => {
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
                        <Light waitingForCar={waitingForCar}></Light>
                        <CreateBtn
                            data-floor-number={floorNumber}
                            onClick={onClickHandler}
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
