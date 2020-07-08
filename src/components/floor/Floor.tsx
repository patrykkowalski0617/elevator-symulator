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
        allCarsStickMans
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

    // add stickmans on floor
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

            const insert = [...stickMans, ...newStickMans];
            console.log(insert);
            setStickMans(insert);
        }
    }, [formStickManData]);

    // get stickmans into car
    useEffect(() => {
        const callback = (carId: number) => {
            const carDirection = allCarsDirection[carId];
            const carFreePlaces = 4 - allCarsStickMans[carId].length;
            let freePlacesLeft = carFreePlaces;
            const updatesStickMans = stickMans.map(item => {
                const { destination, direction, lifeState } = item;

                const _destination = destination;
                const _direction =
                    destination > floorNumber
                        ? "up"
                        : destination < floorNumber
                        ? "down"
                        : null;
                const _carId =
                    carDirection === direction && freePlacesLeft > 0
                        ? carId
                        : null;
                const _lifeState =
                    carDirection === direction && freePlacesLeft > 0
                        ? "get-into-car"
                        : lifeState;
                const _placeInCar =
                    _lifeState === "get-into-car" ? freePlacesLeft - 1 : null;

                // update number of available places in car
                if (carDirection === direction) {
                    freePlacesLeft--;
                }

                return {
                    destination: _destination,
                    direction: _direction,
                    lifeState: _lifeState,
                    carId: _carId,
                    placeInCar: _placeInCar
                };
            });
            console.log(updatesStickMans);
            setStickMans([...updatesStickMans].reverse());
            setTimeout(() => {
                console.log("remove stickmans on floor and let car go");
                console.log(
                    "do next action from floorEventsStack (to be implemented?): => create new stickmans => mange get into another car if necessary"
                );
            }, 1000);
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
