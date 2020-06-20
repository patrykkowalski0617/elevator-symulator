const floorColor = ({
    numberOfFloors,
    floorNumber
}: {
    numberOfFloors: number;
    floorNumber: number;
    s?: number | undefined;
    l?: number | undefined;
}) => `hsla(${(360 / numberOfFloors) * floorNumber}, 50%, 30%, 0.5)`;

export default floorColor;
