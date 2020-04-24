import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { BuildingContext } from "../context/BuildingContext";

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

const callAutomation = (call, floorNumber, setAllCarsCurrentFloor) => {
    const trafficLevel = [50000, 30000, 10000, 10];
    const cachedBugTimes = [1476, 6680, 1902, 1455, 1414, 5737, 5682, 3784];
    const caseType = ["random", "3", "even", "even2", "cachedBug"];

    const t = trafficLevel[2];
    const c = caseType[4];

    if (c === "random") {
        const timeToCall = Math.floor(Math.random() * t);
        setTimeout(() => {
            call();
        }, timeToCall);
    } else if (c === "3") {
        if (floorNumber < 5 && floorNumber > 2) {
            call();
        }
    } else if (c === "even") {
        // setAllCarsCurrentFloor([4, 4]);
        if (floorNumber % 2 === 0) {
            call();
        }
    } else if (c === "even2") {
        // setAllCarsCurrentFloor([3, 3]);
        if (floorNumber % 2 === 0) {
            call();
        }
    } else if (c === "cachedBug") {
        // setAllCarsCurrentFloor([0, 0]);
        setTimeout(() => {
            call();
        }, cachedBugTimes[floorNumber]);
    }
};

export default function Floor({ floorHeight, floorNumber, role }) {
    const [waitingForCar, setWaitingForCar] = useState(false);
    const [noCar, setNoCar] = useState(false);
    const { setAllCarsCurrentFloor } = useContext(ShaftContext);
    const { automotion } = useContext(BuildingContext);

    const call = () => {};

    const resetCall = () => {};

    useEffect(() => {
        if (automotion && role === "enter-floor") {
            callAutomation(call, floorNumber, setAllCarsCurrentFloor);
        }
    }, [automotion]);

    return (
        <FloorStyled floorHeight={floorHeight}>
            {role === "enter-floor" ? (
                <>
                    <button
                        style={noCar ? { background: "red" } : null}
                        data-floor-number={floorNumber}
                        onClick={e => {
                            call(e);
                        }}
                    >
                        Call car
                    </button>
                    <button
                        data-floor-number={floorNumber}
                        onClick={e => {
                            resetCall(e);
                        }}
                    >
                        reset
                    </button>
                </>
            ) : null}
            {waitingForCar ? <CarLight></CarLight> : null}
            {role === "exit-floor" ? (
                <>
                    <p>{floorNumber}</p>
                    <input
                        type="checkbox"
                        style={{ width: "35px", height: "35px" }}
                    />
                </>
            ) : null}
        </FloorStyled>
    );
}
