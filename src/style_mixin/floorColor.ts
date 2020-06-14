const floorColor = (numberOfFloors: number, floorNumber: number) =>
    `hsl(${(360 / numberOfFloors) * floorNumber}, 30%, 30%)`;

export default floorColor;
