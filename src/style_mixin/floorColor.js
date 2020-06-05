const floorColor = (numberOfFloors, floorNumber) =>
    `hsl(${(360 / numberOfFloors) * floorNumber}, 30%, 30%)`;

export default floorColor;
