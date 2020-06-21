import React, { useContext } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import { floorColor } from "../../style_mixin";
import { Container, StickManStyled } from "./StickManStyled";

type StickManProps = {
    stickId: number;
    destination: number;
    getIn: boolean;
    numberOfPassengers: number;
    assignedCar: number | null;
    place: string;
};

const StickMan = ({
    stickId,
    destination,
    getIn,
    numberOfPassengers,
    assignedCar,
    place
}: StickManProps) => {
    const { numberOfFloors, carWidth } = useContext(BuildingContext);

    const color = floorColor({ numberOfFloors, floorNumber: destination });

    return (
        <Container
            stickId={stickId}
            getIn={getIn}
            numberOfPassengers={numberOfPassengers}
            assignedCar={assignedCar}
            carWidth={carWidth}
            place={place}
        >
            <p>{destination}</p>
            <StickManStyled color={color}></StickManStyled>
        </Container>
    );
};

export default StickMan;
