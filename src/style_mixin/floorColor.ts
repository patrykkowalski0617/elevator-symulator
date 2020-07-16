const floorColor = ({
    numberOfFloors,
    floorNumber
}: {
    numberOfFloors: number;
    floorNumber: number;
    s?: number | undefined;
    l?: number | undefined;
}) => `hsla(${(360 / numberOfFloors) * floorNumber}, 30%, 30%, 0.7)`;

export default floorColor;
