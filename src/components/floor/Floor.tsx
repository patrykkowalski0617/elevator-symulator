import React, { useState, useContext, useEffect } from "react";
import {
    FloorStyled,
    CarInfo,
    CarInfoItem,
    CreateBtn,
    Light
} from "./FloorStyled";
import { ShaftContext, FloorsContext, BuildingContext } from "../../context";
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
    const { floorsWaitingForCar, addFloorWaitingForCar } = useContext(
        FloorsContext
    );
    const waitingForCar: { up: boolean; down: boolean } =
        floorsWaitingForCar[floorNumber];
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
    useEffect(() => {
        if (formStickManData?.floorNumber === floorNumber) {
            const { destination, howMany } = formStickManData;
            const newStickMans = Array(howMany).fill({
                destination,
                direction:
                    destination > floorNumber
                        ? "up"
                        : destination < floorNumber
                        ? "down"
                        : null,
                lifeState: "wait-for-car",
                carId: null,
                placeInCar: null
            });
            setStickMans([...newStickMans, ...stickMans]);
        }
    }, [formStickManData]);

    useEffect(() => {
        const callback = (carId: number) => {
            console.log(carId);
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
                data={stickMans.map(item => {
                    const { lifeState, destination, carId, placeInCar } = item;
                    return { lifeState, destination, carId, placeInCar };
                })}
            />
        </FloorStyled>
    );
};

export default Floor;
