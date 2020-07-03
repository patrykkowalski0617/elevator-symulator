import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
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
        allCarsFloorAssignments,
        allCarsDirection,
        allCarsStickMansDestinations
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

    const [stickMans, setStickMans] = useState<
        {
            destination: number;
            direction: string | null;
            lifeState: string;
            asignedCar: number | null;
            placeInCar: number | null;
        }[]
    >([]);

    useEffect(() => {
        if (stickMansDestinations.length) {
            setStickMans(
                stickMansDestinations.map(item => ({
                    destination: item,
                    direction:
                        item > floorNumber
                            ? "up"
                            : item < floorNumber
                            ? "down"
                            : null,
                    lifeState: "wait-for-car",
                    asignedCar: null,
                    placeInCar: null
                }))
            );
        }
    }, [stickMansDestinations]);

    useEffect(() => {
        const callback = (carId: number) => {
            const direction = allCarsDirection[carId];
            const freePlaces = 4 - allCarsStickMansDestinations[carId].length;
            console.log(carId, direction, freePlaces, stickMans);
            // setStickMans(
            //     stickMansDestinations.map(item => ({
            //         destination: item,
            //         direction:
            //             item > floorNumber
            //                 ? "up"
            //                 : item < floorNumber
            //                 ? "down"
            //                 : null,
            //         lifeState: "get-into-car-0",
            //         asignedCar: null,
            //         placeInCar: null
            //     }))
            // );
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
        const stickMansDestination = stickMans.map(
            (item: { destination: number }) => item.destination
        );
        waitingForCarUpdate({
            waitingForCar,
            stickMansDestination,
            addFloorWaitingForCar,
            floorNumber
        });
    }, [stickMans]);

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
                <CarInfoItem>
                    <Light waitingForCar={waitingForCar} noCar={noCar}></Light>
                </CarInfoItem>
                <CarInfoItem>
                    <CreateBtn onClick={createStickmanHandler}>+</CreateBtn>
                </CarInfoItem>
            </CarInfo>
            <StickManSet
                lifeState={stickMans.map(item => item.lifeState)}
                stickMansDestinations={stickMans.map(item => item.destination)}
            />
        </FloorStyled>
    );
};

export default Floor;
