import React, { useContext } from "react";
import { BuildingContext } from "../../context";
import { floorColor } from "../../style_mixin";
import {
    Container,
    StickManStyled,
    StickManHead,
    FloorInfo
} from "./StickManStyled";

type StickManProps = {
    data: {
        lifeState: string;
        destination: number;
        carId: number | null;
        placeInCar: number | null;
    };
    index: number;
};

const StickMan = ({ data, index }: StickManProps) => {
    const { numberOfFloors, carWidth } = useContext(BuildingContext);
    const { lifeState, destination, carId, placeInCar } = data;
    const color = floorColor({ numberOfFloors, floorNumber: destination });

    return (
        <Container
            index={index}
            lifeState={lifeState}
            carWidth={carWidth}
            carId={carId}
            placeInCar={placeInCar}
        >
            <FloorInfo>{destination}</FloorInfo>
            <StickManStyled color={color}>
                <StickManHead />
            </StickManStyled>
        </Container>
    );
};

export default StickMan;
