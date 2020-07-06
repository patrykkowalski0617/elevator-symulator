import React from "react";
import StickMan from "../stickman/StickMan";

type StickManSetProps = {
    data: {
        lifeState: string;
        destination: number;
        carId: number | null;
        placeInCar: number | null;
    }[];
};

const StickManSet = ({ data }: StickManSetProps) => {
    // single stickman states: wait-for-car / get-into //// in-car-0 / get-off //// wait-for-dead

    return (
        <>
            {data.map((item, index) => (
                <StickMan key={index} data={item} index={index} />
            ))}
        </>
    );
};

export default StickManSet;
