import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import { animation } from "../car_logic";

const CarStyled = styled.div`
    text-align: center;
    width: 100%;
    height: ${props => 100 / props.numberOfFloors}%;
    background: #999;
    padding: 3px 0 0 0;
    border-style: solid;
    border-color: #222;
    border-width: 2px 1px;
    position: relative;
    margin: 0 1px;
    &::before,
    &::after {
        display: block;
        position: absolute;
        height: 2px;
        left: -1px;
        right: -1px;
        background: #222;
        content: "";
    }
    &::after {
        bottom: -4px;
    }
    &::before {
        top: -4px;
    }
`;

const SpeedControl = styled.div`
    position: relative;
    height: 4px;
    background-image: linear-gradient(to right, green, #999900, #ff9900, red);
    border-bottom: 1px solid;
    opacity: ${props => (props.speed < 0.5 ? 0.5 : props.speed)};
`;

const SpeedMarkChanger = styled.div`
    width: ${props => 100 - 100 * props.speed}%;
    background: #999;
    position: absolute;
    z-index: 1000;
    right: 0;
    top: -0.5px;
    height: 5px;
`;

// const Door = styled.div`
//     background-color: red;
//     width: 100%;
//     height: 3px;
//     opacity: 0;
//     ${props =>
//         props.open
//             ? "width: 0%; transition: 2s linear width; opacity: 1"
//             : null}
// `;

// const frameIntervalTime = 10;

const Car = ({ numberOfFloors, carId }) => {
    const { updateCarCurrentFloor, allCarsCurrentFloor } = useContext(
        ShaftContext
    );
    const [carPosition, setCarPosition] = useState(0);
    const { start } = animation(15);

    const getPosition = position => {
        setCarPosition(position);
    };
    const getCurrentFloor = currentFloor => {
        updateCarCurrentFloor(carId, currentFloor);
    };
    return (
        <CarStyled
            numberOfFloors={numberOfFloors}
            style={{
                transform: `translateY(calc(-${carPosition}%))`
            }}
        >
            <button
                onClick={() => {
                    start(carId + 1, 0, getCurrentFloor, getPosition);
                }}
            >
                start
            </button>
            <SpeedControl speed={0}>
                <SpeedMarkChanger speed={0} />
            </SpeedControl>
            <p>T: {String("t")}</p>
            <p>Now: {allCarsCurrentFloor[carId]}</p>
        </CarStyled>
    );
};

export default Car;
