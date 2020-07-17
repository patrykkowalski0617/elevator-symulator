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
    updateWaitingForCarInfo,
    callCar,
    carCame,
    disappearStickmans,
    getStickmansIntoCar,
    addStickmansOnFloor,
    reorderStickmansAfterGetIn,
    assignCars
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
    const [carReadyForPassengers, setCarReadyForPassengers] = useState<boolean>(
        false
    );

    // craete stickman
    const createStickmanHandler = () => {
        setCreatingStickMan(floorNumber);
    };

    // add stickmans on floor
    useEffect(() => {
        addStickmansOnFloor({
            formStickManData,
            floorNumber,
            stickMans,
            setStickMans
        });
    }, [formStickManData]);

    // turn on "waiting for car" light
    useEffect(() => {
        updateWaitingForCarInfo({
            stickMans,
            floorNumber,
            setWaitingForCar
        });
    }, [stickMans]);

    // assign and call the car
    useEffect(() => {
        assignCars({
            allCarsFloorAssignments,
            floorNumber,
            assignedCars,
            setAssignedCars
        });
    }, [allCarsFloorAssignments]);

    const _callCar = callCar({
        allCarsState,
        allCarsCurrentFloor,
        allCarsFloorAssignments,
        floorNumber,
        addCarFloorAssignment,
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

    // detect when car came
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

    // let stickmans leave the car
    useEffect(() => {
        if (whichCarCame !== null) {
            console.log("let current passegers leave");
            document.body.style.background = "crimson";
            const assignedCarsUpdate = assignedCars.filter(
                item => item !== whichCarCame
            );
            setAssignedCars(assignedCarsUpdate);
            setTimeout(() => {
                setCarReadyForPassengers(true);
            }, 1000);
        }
    }, [whichCarCame]);

    // get stickmans into the car
    useEffect(() => {
        if (carReadyForPassengers) {
            document.body.style.background = "";
            console.log("let new passangers get into");
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
        }
    }, [carReadyForPassengers]);

    // make stickmans disappear on floor
    useEffect(() => {
        disappearStickmans({
            deleteStickMans,
            setDeleteStickMans,
            stickMans,
            setStickMans
        });
    }, [deleteStickMans]);

    // physically delete stickmans on floor
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

    return (
        <FloorStyled numberOfFloors={numberOfFloors} floorColor={floorColor}>
            <CarInfo>
                <CarInfoItem>
                    <CreateBtn onClick={createStickmanHandler}>+</CreateBtn>
                </CarInfoItem>
                <CarInfoItem>
                    <Light waitingForCar={waitingForCar} noCar={noCar}></Light>
                </CarInfoItem>
                <CarInfoItem>
                    <p>{floorNumber}</p>
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
