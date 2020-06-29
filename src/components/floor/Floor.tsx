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
import { waitingForCarUpdate, callCar, carCame } from "./logic";
import StickManSet from "../stickman_set/StickManSet";

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
        allCarsFloorAssignments
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

    useEffect(() => {
        const callback = (carId: number) => {
            console.log("car " + carId + " came");
        };

        carCame({
            assignedCars,
            allCarsState,
            carsOnFloor,
            setCarsOnFloor,
            callback
        });
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
    }, [waitingForCar.up]);

    useEffect(() => {
        if (waitingForCar.down) {
            _callCar();
        }
    }, [waitingForCar.down]);

    const createStickmanHandler = () => {
        setCreatingStickMan(floorNumber);
    };

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
            <StickManSet />
        </FloorStyled>
    );
};

export default Floor;
