import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import carAnimation from "../logic/carAnimation";

const CarStyled = styled.div`
    height: ${props => props.floorHeight - props.positionOnLoad}px;
    background: #999;
    position: absolute;
    bottom: ${props => props.positionOnLoad}px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
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

const Car = ({ floorHeight, carId, floorAssignment }) => {
    const {
        allCarsCurrentFloor,
        setAllCarsCurrentFloor,
        allDirections,
        setAllDirections,
        floorAssignments,
        setFloorAssignments
    } = useContext(ShaftContext);
    const [carCurrentFloor, setCarCurrentFloor] = useState(0);
    const [direction, setDirection] = useState(null);
    const [startMove, setStartMove] = useState(false);
    const [carDOM, setCarDOM] = useState(null);
    const [speed, setSpeed] = useState(0);

    const callback = () => {
        const _floorAssignments = floorAssignments;
        _floorAssignments.splice(carId, 1, null);

        setFloorAssignments([..._floorAssignments]);
    };

    const move = carAnimation(
        floorAssignment,
        floorHeight,
        setDirection,
        setSpeed,
        carCurrentFloor,
        setCarCurrentFloor,
        carDOM,
        callback
    );

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setCarDOM(ref);
    }, []);

    useEffect(() => {
        const _allCarsCurrentFloor = allCarsCurrentFloor;
        _allCarsCurrentFloor.splice(carId, 1, carCurrentFloor);

        setAllCarsCurrentFloor([..._allCarsCurrentFloor]);
    }, [carCurrentFloor]);

    useEffect(() => {
        const _allDirections = allDirections;
        _allDirections.splice(carId, 1, direction);

        setAllDirections([..._allDirections]);
    }, [direction]);

    useEffect(() => {
        if (startMove) {
            setStartMove(false);
            move();
        }
    }, [startMove]);

    useEffect(() => {
        if (floorAssignments[carId] !== null) {
            setStartMove(true);
        }
    }, [floorAssignments[carId]]);

    return (
        <CarStyled
            ref={buildingRef}
            floorHeight={floorHeight}
            positionOnLoad={-4}
            style={{ textAlign: "center" }}
        >
            <SpeedControl speed={speed}>
                <SpeedMarkChanger speed={speed} />
            </SpeedControl>
            <p>{floorAssignment || "null"}</p>
            <p>{allCarsCurrentFloor[carId]}</p>
        </CarStyled>
    );
};

export default Car;
