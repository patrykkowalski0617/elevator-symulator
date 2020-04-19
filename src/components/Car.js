import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import carAnimation from "../logic/carAnimation";

const CarStyled = styled.div`
    height: ${(props) => props.floorHeight - props.positionOnLoad}px;
    background: #999;
    position: absolute;
    bottom: ${(props) => props.positionOnLoad}px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
`;

const SpeedControl = styled.div`
    position: relative;
    height: 4px;
    background-image: linear-gradient(to right, green, #999900, #ff9900, red);
    border-bottom: 1px solid;
    opacity: ${(props) => (props.speed < 0.5 ? 0.5 : props.speed)};
`;

const SpeedMarkChanger = styled.div`
    width: ${(props) => 100 - 100 * props.speed}%;
    background: #999;
    position: absolute;
    z-index: 1000;
    right: 0;
    top: -0.5px;
    height: 5px;
`;

const Car = ({ floorHeight, carId }) => {
    const { allCarsCurrentFloor, allCarsFloorAssignments } = useContext(
        ShaftContext
    );
    const [carDOM, setCarDOM] = useState(null);
    const [speed, setSpeed] = useState(0);
    const [target, setTarget] = useState(null);

    const buildingRef = useRef();
    useEffect(() => {
        const ref = buildingRef.current;
        setCarDOM(ref);
    }, []);

    useEffect(() => {
        const target = allCarsFloorAssignments[carId].length
            ? Math.min.apply(Math, allCarsFloorAssignments[carId])
            : null;
        setTarget(target);
    }, [allCarsFloorAssignments, carId]);

    useEffect(() => {
        carAnimation(
            target,
            floorHeight,
            // setDirection,
            setSpeed,
            allCarsCurrentFloor[carId],
            // setCarCurrentFloor,
            carDOM
        );
    }, [allCarsCurrentFloor, carDOM, carId, floorHeight, target]);

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
            {/* <button onClick={removeReachedFloor}>removeReachedFloor</button> */}
            <p>Tar: {String(target)}</p>
            <p>Now: {allCarsCurrentFloor[carId]}</p>
        </CarStyled>
    );
};

export default Car;

// useEffect(() => {
//     const _allCarsCurrentFloor = allCarsCurrentFloor;
//     _allCarsCurrentFloor.splice(carId, 1, carCurrentFloor);

//     setAllCarsCurrentFloor([..._allCarsCurrentFloor]);
// }, [carCurrentFloor]);

// useEffect(() => {
//     const _allCarStates = allCarStates;
//     _allCarStates.splice(carId, 1, carState);

//     setAllCarStates([..._allCarStates]);
// }, [carState]);

// const removeReachedFloor = () => {
//     const _floorAssignments = floorAssignments;
//     const floorAssignmentsForThisCar = destinations;
//     const index = floorAssignmentsForThisCar.indexOf(target);
//     floorAssignmentsForThisCar.splice(index, 1);

//     _floorAssignments.splice(carId, 1, floorAssignmentsForThisCar);
//     setFloorAssignments([..._floorAssignments]);

//     setCarState(null);
// };

// useEffect(() => {
//     const target = destinations.length
//         ? Math.min.apply(Math, destinations)
//         : null;
//     console.warn("set TARGET");
//     setTarget(target);
// }, [destinations, floorAssignments]);

// useEffect(() => {
//     console.log(
//         "car: " + carId,
//         "destinations ",
//         destinations,
//         "floorAssignments",
//         floorAssignments,
//         "target",
//         target,
//         "allCarStates",
//         allCarStates,
//         "carState",
//         carState
//     );
//     if (target !== null && carState === null) {
//         setStartMove(true);
//     }
// }, [allCarStates, carId, carState, destinations, floorAssignments, target]);

// useEffect(() => {
//     if (startMove) {
//         setStartMove(false);
//         carAnimation(
//             target,
//             floorHeight,
//             setCarState,
//             setSpeed,
//             carCurrentFloor,
//             setCarCurrentFloor,
//             carDOM
//         );
//     }
// }, [startMove]);
