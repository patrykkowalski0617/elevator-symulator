import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
    CarInfo,
    CarInfoItem,
    CreateBtn,
    Light
} from "./FloorStyled";
import { ShaftContext, BuildingContext } from "../../context";
import {
    waitingForCarUpdate,
    callCar,
    carCame,
    disappearStickmans,
    getStickmansIntoCar,
    addStickmansOnFloor,
    reorderStickmansAfterGetIn
} from "./logic";
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
        allCarsFloorAssignments,
        allCarsDirection,
        updateCarDirection,
        allCarsStickMans,
        addPassengers
    } = useContext(ShaftContext);
    const { setCreatingStickMan, formStickManData } = useContext(
        BuildingContext
    );

    const [noCar, setNoCar] = useState<boolean>(false);
    const [assignedCars, setAssignedCars] = useState<number[]>([]);
    const [carsOnFloor, setCarsOnFloor] = useState<number[]>([]);
    const [stickMans, setStickMans] = useState<
        {
            destination: number;
            direction: string | null;
            lifeState: string;
            carId: number | null;
            placeInCar: number | null;
        }[]
    >([]);
    const [waitingForCar, setWaitingForCar] = useState<{
        up: boolean;
        down: boolean;
    }>({
        up: false,
        down: false
    });
    const [whichCarCame, setWhichCarCame] = useState<number | null>(null);
    const [deleteStickMans, setDeleteStickMans] = useState<number | null>(null);
    const [carReadyToGo, setCarReadyToGo] = useState<number | null>(null);
    // add stickmans on floor
    useEffect(() => {
        addStickmansOnFloor({
            formStickManData,
            floorNumber,
            stickMans,
            setStickMans
        });
    }, [formStickManData]);

    // get stickmans into car
    useEffect(() => {
        carCame({
            assignedCars,
            allCarsState,
            carsOnFloor,
            setCarsOnFloor,
            allCarsCurrentFloor,
            floorNumber,
            setWhichCarCame
        });
    }, [allCarsState]);

    useEffect(() => {
        getStickmansIntoCar({
            whichCarCame,
            allCarsDirection,
            allCarsStickMans,
            stickMans,
            floorNumber,
            setStickMans,
            setDeleteStickMans,
            addPassengers,
            setWhichCarCame,
            setCarReadyToGo
        });
    }, [whichCarCame]);

    useEffect(() => {
        disappearStickmans({
            deleteStickMans,
            setDeleteStickMans,
            stickMans,
            setStickMans
        });
    }, [deleteStickMans]);

    useEffect(() => {
        waitingForCarUpdate({
            stickMans,
            floorNumber,
            setWaitingForCar
        });
    }, [stickMans]);

    const [carsReadyToGo, setCarsReadyToGo] = useState<number[]>([]);
    useEffect(() => {
        reorderStickmansAfterGetIn({
            carReadyToGo,
            carsReadyToGo,
            setCarsReadyToGo,
            carsOnFloor,
            stickMans,
            setStickMans
        });
    }, [carReadyToGo]);

    const _callCar = callCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber,
        addCarFloorAssignment,
        setAssignedCars,
        assignedCars,
        setNoCar,
        updateCarDirection,
        allCarsDirection
    });

    useEffect(() => {
        if (waitingForCar.up) {
            _callCar("up");
        }
    }, [waitingForCar.up]);

    useEffect(() => {
        if (waitingForCar.down) {
            _callCar("down");
        }
    }, [waitingForCar.down]);

    const createStickmanHandler = () => {
        setCreatingStickMan(floorNumber);
    };

    return (
        <FloorStyled numberOfFloors={numberOfFloors} floorColor={floorColor}>
            <CarInfo>
                <CarInfoItem>
                    <CreateBtn onClick={createStickmanHandler}>+</CreateBtn>
                </CarInfoItem>
                <CarInfoItem>
                    <Light waitingForCar={waitingForCar} noCar={noCar}></Light>
                </CarInfoItem>
            </CarInfo>
            <StickManSet
                data={stickMans.map(item => {
                    const { lifeState, destination, carId, placeInCar } = item;
                    return { lifeState, destination, carId, placeInCar };
                })}
            />
        </FloorStyled>
    );
};

export default Floor;
