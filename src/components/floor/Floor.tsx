import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
    AssignedCars,
    CarInfo,
    CarInfoItem,
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
    floorColor: string;
};

const Floor = ({ floorNumber, numberOfFloors, floorColor }: FloorProps) => {
    const {
        allCarsState,
        allCarsCurrentFloor,
        addCarFloorAssignment,
        allCarsFloorAssignments,
        addPassengers
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
    const [assignedCars, setAssignedCars] = useState<number[]>([]);
    const [getIn, setGetIn] = useState<boolean>(false);
    const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);
    const [carsOnFloor, setCarsOnFloor] = useState<number[]>([]);

    // when some car reach floor it suppose to share data beetween cars and floor
    useEffect(() => {
        for (let i = 0; i < allCarsState.length; i++) {
            const state = allCarsState[i];
            const currentFloor = allCarsCurrentFloor[i];

            if (
                floorNumber === currentFloor &&
                state.includes("door-open") &&
                !carsOnFloor.includes(i)
            ) {
                console.log("car " + i + " came");
                setCarsOnFloor([...carsOnFloor, i]);
            }
        }
    }, [allCarsState]);

    useEffect(() => {
        if (stickMansDestinations.length) {
            const uniqFloorsSet = new Set(stickMansDestinations);
            const uniqFloors = Array.from(uniqFloorsSet);
            const up = uniqFloors.some(item => item > floorNumber);
            const down = uniqFloors.some(item => item < floorNumber);
            if (!waitingForCar.up || !waitingForCar.down) {
                addFloorWaitingForCar(floorNumber, { up, down });
            }
        }
    }, [stickMansDestinations]);

    const createStickmanHandler = () => {
        setCreatingStickMan(floorNumber);
    };

    const callCar = () => {
        const carId = theNearestCar({
            allCarsState,
            allCarsCurrentFloor,
            allCarsFloorAssignments,
            floorNumber
        });
        if (carId !== null && carId !== undefined && carId >= 0) {
            addCarFloorAssignment(carId, floorNumber);
            setAssignedCars([...assignedCars, carId]);
        } else {
            setNoCar(true);
        }
    };

    useEffect(() => {
        if (waitingForCar.up) {
            callCar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitingForCar.up]);

    useEffect(() => {
        if (waitingForCar.down) {
            callCar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitingForCar.down]);

    const stickMans = stickMansDestinations.map(
        (item: number, index: number) => {
            const assignedCar = null;
            return (
                <StickMan
                    key={index}
                    stickId={index}
                    destination={item}
                    getIn={getIn}
                    numberOfPassengers={1}
                    assignedCar={0}
                    place={"floor"}
                />
            );
        }
    );

    return (
        <FloorStyled numberOfFloors={numberOfFloors} floorColor={floorColor}>
            <>
                <button
                    onClick={() => {
                        setGetIn(true);
                        addPassengers(carsOnFloor[0], 0);
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
                    {waitingForCar.up ||
                    (waitingForCar.down && assignedCars.length) ? (
                        <AssignedCars>
                            Cars: {assignedCars.join(", ")}
                        </AssignedCars>
                    ) : null}
                    {noCar ? <NoCarInfo>No available cars</NoCarInfo> : null}
                    <CarInfoItem>
                        <Light
                            waitingForCar={waitingForCar}
                            noCar={noCar}
                        ></Light>
                    </CarInfoItem>
                    <CarInfoItem>
                        <CreateBtn
                            data-floor-number={floorNumber}
                            onClick={createStickmanHandler}
                        >
                            +
                        </CreateBtn>
                    </CarInfoItem>
                </CarInfo>
                {stickMans}
            </>
        </FloorStyled>
    );
};

export default Floor;
