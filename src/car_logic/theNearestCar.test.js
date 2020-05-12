import theNearestCar, { distanceToAvailableCars } from "./theNearestCar";
import { standardCases, theNearestCarCases } from "./_testCases";

const distanceToAvailableCars_testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            floorNumber,
            expectedBy: { _distanceToAvailableCars }
        } = cases[i];

        test(
            "distanceToAvailableCars " + casesDescription + " case " + i,
            () => {
                const value = distanceToAvailableCars(
                    allCarsState,
                    allCarsCurrentFloor,
                    floorNumber
                );

                expect(value).toEqual(_distanceToAvailableCars);
            }
        );
    }
};

const theNearestCar_testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        const {
            allCarsState,
            allCarsCurrentFloor,
            floorNumber,
            expectedBy: { _theNearestCar }
        } = cases[i];

        test("theNearestCar " + casesDescription + " case " + i, () => {
            const value = theNearestCar(
                allCarsState,
                allCarsCurrentFloor,
                floorNumber
            );

            expect(value).toEqual(_theNearestCar);
        });
    }
};

distanceToAvailableCars_testFunction(standardCases, "standardCases");
theNearestCar_testFunction(standardCases, "standardCases");
theNearestCar_testFunction(theNearestCarCases, "theNearestCarCases");
