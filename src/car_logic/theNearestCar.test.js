import theNearestCar, { distanceToAvailableCars } from "./theNearestCar";
import testCases from "./_testCases";

for (let i = 0; i < testCases.length; i++) {
    const {
        allCarsState,
        allCarsCurrentFloor,
        floorNumber,
        expectedBy: { _distanceToAvailableCars }
    } = testCases[i];

    test("distanceToAvailableCars case " + i, () => {
        const value = distanceToAvailableCars(
            allCarsState,
            allCarsCurrentFloor,
            floorNumber
        );

        expect(value).toEqual(_distanceToAvailableCars);
    });
}

for (let i = 0; i < testCases.length; i++) {
    const {
        allCarsState,
        allCarsCurrentFloor,
        floorNumber,
        expectedBy: { _theNearestCar }
    } = testCases[i];

    test("theNearestCar case " + i, () => {
        const value = theNearestCar(
            allCarsState,
            allCarsCurrentFloor,
            floorNumber
        );

        expect(value).toEqual(_theNearestCar);
    });
}
