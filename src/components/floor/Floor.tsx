import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
    AssignedCars,
    CarInfo,
    CarInfoItem,
    CreateBtn,
    Light
} from "./FloorStyled";
import { ShaftContext } from "../../context/ShaftContext";
import { FloorsContext } from "../../context/FloorsContext";
import { BuildingContext } from "../../context/BuildingContext";
import StickMan from "../stickman/StickMan";
import { waitingForCarUpdate, callCar } from "./logic";

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
        allCarsStickMansDestinations,
        allCarsDirection,
        addPassengers
    } = useContext(ShaftContext);
    const {
        floorsWaitingForCar,
        addFloorWaitingForCar,
        allFloorsStickMansDestinations
    } = useContext(FloorsContext);
    const stickMansDestinations: number[] =
        allFloorsStickMansDestinations[floorNumber];
    const waitingForCar: { up: boolean; down: boolean } =
        floorsWaitingForCar[floorNumber];
    const { setCreatingStickMan } = useContext(BuildingContext);

    const [noCar, setNoCar] = useState<boolean>(false);
    const [assignedCars, setAssignedCars] = useState<number[]>([]);
    const [carsOnFloor, setCarsOnFloor] = useState<number[]>([]);
    const [indexesForGetIn, setIndexesForGetIn] = useState<number[]>([]);

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
                setTimeout(() => {
                    const freePlacesInCar: number =
                        4 - allCarsStickMansDestinations[i].length;
                    const stickmans = stickMansDestinations;
                    const firstInQueue =
                        stickMansDestinations[stickMansDestinations.length - 1];
                    const direction = allCarsDirection[i]
                        ? allCarsDirection[i]
                        : firstInQueue > floorNumber
                        ? "up"
                        : firstInQueue < floorNumber
                        ? "down"
                        : null;
                    const indexesForGetIn: number[] = [];
                    for (let i = 0; i < stickmans.length; i++) {
                        const stickman = stickmans[i];
                        if (indexesForGetIn.length < freePlacesInCar) {
                            if (direction === "up" && stickman > floorNumber) {
                                indexesForGetIn.push(i);
                            } else if (
                                direction === "down" &&
                                stickman < floorNumber
                            ) {
                                indexesForGetIn.push(i);
                            }
                        }
                    }
                    setIndexesForGetIn(indexesForGetIn);
                    console.log("get in", {
                        freePlacesInCar,
                        stickmans,
                        firstInQueue,
                        indexesForGetIn,
                        direction
                    });
                    setTimeout(() => {
                        // addPassengers(i, 0);
                        console.log("replace stickmans");
                    }, 1000);
                    setCarsOnFloor([...carsOnFloor, i]);
                }, 1000);
            }
        }
    }, [allCarsState]);

    useEffect(() => {
        waitingForCarUpdate({
            waitingForCar,
            stickMansDestinations,
            addFloorWaitingForCar,
            floorNumber
        });
    }, [stickMansDestinations]);

    const _callCar = callCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber,
        addCarFloorAssignment,
        setAssignedCars,
        assignedCars,
        setNoCar
    });

    useEffect(() => {
        if (waitingForCar.up) {
            _callCar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitingForCar.up]);

    useEffect(() => {
        if (waitingForCar.down) {
            _callCar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitingForCar.down]);

    const createStickmanHandler = () => {
        setCreatingStickMan(floorNumber);
    };

    const stickMans = stickMansDestinations.map(
        (item: number, index: number) => {
            let getIn: boolean = false;
            if (indexesForGetIn.includes(index)) {
                getIn = true;
            }

            return (
                <StickMan
                    key={index}
                    stickId={index}
                    destination={item}
                    getIn={getIn}
                    numberOfPassengers={indexesForGetIn.length}
                    assignedCar={0}
                    place={"floor"}
                />
            );
        }
    );

    return (
        <FloorStyled numberOfFloors={numberOfFloors} floorColor={floorColor}>
            <CarInfo>
                {waitingForCar.up ||
                (waitingForCar.down && assignedCars.length) ? (
                    <AssignedCars>Cars: {assignedCars.join(", ")}</AssignedCars>
                ) : null}
                <CarInfoItem>
                    <Light waitingForCar={waitingForCar} noCar={noCar}></Light>
                </CarInfoItem>
                <CarInfoItem>
                    <CreateBtn onClick={createStickmanHandler}>+</CreateBtn>
                </CarInfoItem>
            </CarInfo>
            {stickMans}
        </FloorStyled>
    );
};

export default Floor;
