import React, { useContext } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import { floorColor } from "../../style_mixin";
import { Container, StickManStyled, FloorInfo } from "./StickManStyled";

type StickManProps = {
    index: number;
    destination: number;
    lifeState: string;
    carId: number | null;
};

const StickMan = ({ index, destination, lifeState, carId }: StickManProps) => {
    const { numberOfFloors, carWidth } = useContext(BuildingContext);

    const color = floorColor({ numberOfFloors, floorNumber: destination });

    return (
        <Container
            index={index}
            lifeState={lifeState}
            carWidth={carWidth}
            carId={carId}
        >
            <FloorInfo>{index}</FloorInfo>
            <StickManStyled color={color}></StickManStyled>
        </Container>
    );
};

export default StickMan;
