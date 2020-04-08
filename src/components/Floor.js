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
    const { carCurrenFloorCon } = useContext(ShaftContext);

    const theNearestCarNum = arrData => {
        let min = Number.POSITIVE_INFINITY;
        let theNearestCarNum = null;

        for (let i = 0; i < arrData.length; i++) {
            let distanceToFloor = arrData[i].distanceToFloor;
            let carNumber = arrData[i].carNumber;

            if (distanceToFloor < min) {
                theNearestCarNum = carNumber;
            }
            min = distanceToFloor < min ? distanceToFloor : min;
        }

        return theNearestCarNum;
    };

    const onClickHandler = e => {
        if (!waitingForCar) {
            setWaitingForCar(true);
            const distancesToCars = carCurrenFloorCon.map((item, index) => {
                return {
                    carNumber: index,
                    distanceToFloor: Math.abs(floorNumber - item)
                };
            });

            // DONE:
            // find the nearest Car
            console.log(theNearestCarNum(distancesToCars));

            // TO OD:
            //  get elevators with correct direction
            // get elevator whitch is not busy or is less bussy than other
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
