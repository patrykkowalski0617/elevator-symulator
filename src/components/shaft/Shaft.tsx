import React from "react";
import { ShaftStyled } from "./ShaftStyled";
import Car from "../car/Car";

type ShaftProps = {
    numberOfCars: number;
    carWidth: string;
    numberOfFloors: number;
};

const Shaft = ({ numberOfCars, carWidth, numberOfFloors }: ShaftProps) => {
    const renderCars = () => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < numberOfCars; i++) {
            arr.push(
                <ShaftStyled key={i} carWidth={carWidth}>
                    <Car carId={i} numberOfFloors={numberOfFloors} />
                </ShaftStyled>
            );
        }

        return arr;
    };

    return <>{renderCars()}</>;
};

export default Shaft;
