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
        allCarsFloorAssignments,
        allCarsDirection,
        allCarsStickMansDestinations
    } = useContext(ShaftContext);
    const {
        floorsWaitingForCar,
        addFloorWaitingForCar,
        allFloorsStickMansDestinations,
        removeStickMansDestinations
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
            carId: number | null;
            placeInCar: number | null;
        }[]
    >([]);

    useEffect(() => {
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
                carId: null,
                placeInCar: null
            }))
        );
    }, [stickMansDestinations]);

    useEffect(() => {
        const callback = (carId: number) => {
            const carDirection = allCarsDirection[carId];
            // console.log(carId, carDirection, freePlaces, stickMans);

            // split stickmans for two groups: get into the car and stay on floor
            setTimeout(() => {
                let freePlaces: number =
                    4 - allCarsStickMansDestinations[carId].length;
                const _stickMans = stickMansDestinations.map(item => {
                    const stickManDirection =
                        item > floorNumber
                            ? "up"
                            : item < floorNumber
                            ? "down"
                            : null;

                    const lifeState =
                        carDirection === stickManDirection && freePlaces > 0
                            ? "get-into-car"
                            : "wait-for-car";
                    // update number of available places in car
                    if (carDirection === stickManDirection) {
                        freePlaces--;
                    }
                    const placeInCar =
                        lifeState === "get-into-car" ? freePlaces : null;

                    return {
                        destination: item,
                        direction: stickManDirection,
                        lifeState,
                        carId:
                            carDirection === stickManDirection &&
                            freePlaces >= 0
                                ? carId
                                : null,
                        placeInCar
                    };
                });
                console.log("stickmans for get into", _stickMans);
                setStickMans(_stickMans.reverse());
            }, 1000);

            // search for stickmans for kill on floor and create in car
            // setTimeout(() => {
            //     removeStickMansDestinations(floorNumber, [0, 1]);
            // }, 2000);
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
