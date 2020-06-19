const floorColor = ({
    numberOfFloors,
    floorNumber,
    s = 30,
    l = 30
}: {
    numberOfFloors: number;
    floorNumber: number;
    s?: number | undefined;
    l?: number | undefined;
}) => `hsl(${(360 / numberOfFloors) * floorNumber}, ${s}%, ${l}%)`;

export default floorColor;
