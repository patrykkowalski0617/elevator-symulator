import React from "react";
import StickMan from "../stickman/StickMan";

type StickManSetProps = {
    lifeState: string[];
    stickMansDestinations: number[];
    carId: (number | null)[];
};

const StickManSet = ({
    lifeState,
    stickMansDestinations,
    carId
}: StickManSetProps) => {
    // single stickman states: wait-for-car / get-into //// in-car-0 / get-off //// wait-for-dead

    return (
        <>
            {stickMansDestinations.map((destination, index) => (
                <StickMan
                    key={index}
                    index={index}
                    lifeState={lifeState[index]}
                    destination={destination}
                    carId={carId[index]}
                />
            ))}
        </>
    );
};

export default StickManSet;
