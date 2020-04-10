import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";

const FloorStyled = styled.div`
    border-bottom: 4px solid;
    height: ${props => props.floorHeight}px;
`;

const CarLight = styled.div`
    background: orange;
    width: 7px;
    height: 7px;
    margin: 7px 7px auto auto;
    float: right;
    border-radius: 100%;
`;

export default function Floor({ floorHeight, floorNumber, role }) {
    const [waitingForCar, setWaitingForCar] = useState(false);
    const { allCarsCurrentFloor, allDirections } = useContext(ShaftContext);

    const carsWithCorrectDirection = () => {
        let carIds = [];

        for (let i = 0; i < allDirections.length; i++) {
            const direction = allDirections[i];
            const currentFloor = allCarsCurrentFloor[i];

            if (
                direction === null ||
                (direction === "up" && currentFloor < floorNumber) ||
                (direction === "down" && currentFloor > floorNumber)
            ) {
                carIds.push(i);
            }
        }

        return carIds;
    };

    const theNearestCarNum = () => {
        const distancesToCars = allCarsCurrentFloor.map((item, index) => {
            return {
                carId: index,
                distanceToFloor: Math.abs(floorNumber - item)
            };
        });

        let min = Number.POSITIVE_INFINITY;
        let theNearestCarNum = null;

        for (let i = 0; i < distancesToCars.length; i++) {
            let distanceToFloor = distancesToCars[i].distanceToFloor;
            let carId = distancesToCars[i].carId;

            if (distanceToFloor < min) {
                theNearestCarNum = carId;
            }
            min = distanceToFloor < min ? distanceToFloor : min;
        }

        return theNearestCarNum;
    };

    const onClickHandler = () => {
        if (!waitingForCar) {
            setWaitingForCar(true);

            // DONE:
            console.log(carsWithCorrectDirection());
            console.log(theNearestCarNum());

            // TO OD:
            // theNearestCarNum searching only carsWithCorrectDirection
            // get car whitch is not busy or is less bussy than other
            // start car move from floor component
        }
    };

    return (
        <FloorStyled floorHeight={floorHeight}>
            {role === "enter-floor" ? (
                <button
                    data-floor-number={floorNumber}
                    onClick={e => {
                        onClickHandler(e);
                    }}
                >
                    Call car
                </button>
            ) : (
                ""
            )}
            {waitingForCar ? <CarLight></CarLight> : ""}
        </FloorStyled>
    );
}
