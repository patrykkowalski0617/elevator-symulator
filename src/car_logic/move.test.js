import move from "./move";

const cases = [
    {
        targetFloor: 9,
        currentFloor: 0,
        currentPosition: 0,
        intervalId: 0,
        isContinuation: false,
        expectedResults: {
            getCurrentFloor: 9,
            getPosition: 900
        }
    },
    {
        targetFloor: 0,
        currentFloor: 9,
        currentPosition: 900,
        intervalId: 0,
        isContinuation: false,
        expectedResults: {
            getCurrentFloor: 0,
            getPosition: 0
        }
    },
    {
        targetFloor: 0,
        currentFloor: 9,
        currentPosition: 900,
        intervalId: 0,
        isContinuation: true,
        expectedResults: {
            // it supposed to call getCurrentFloor one time less
            // so it will not target floor 0
            getCurrentFloor: 1,
            getPosition: 0
        }
    }
];

jest.useFakeTimers();

const testFunction = (cases, casesDescription) => {
    for (let i = 0; i < cases.length; i++) {
        test("move", done => {
            const getCarState = jest.fn(() => {
                try {
                    done();
                } catch (error) {
                    done(error);
                }
            });

            const getCurrentFloor = jest.fn(() => {
                try {
                    done();
                } catch (error) {
                    done(error);
                }
            });

            const getPosition = jest.fn(() => {
                try {
                    done();
                } catch (error) {
                    done(error);
                }
            });

            const setIntervalId = jest.fn(() => {
                try {
                    done();
                } catch (error) {
                    done(error);
                }
            });

            const start = move(
                getCarState,
                getCurrentFloor,
                getPosition,
                setIntervalId
            );

            const {
                targetFloor,
                currentFloor,
                currentPosition,
                intervalId,
                isContinuation,
                expectedResults
            } = cases[i];

            start(
                targetFloor,
                currentFloor,
                currentPosition,
                intervalId,
                isContinuation
            );

            jest.runAllTimers();
            expect(getCurrentFloor).toHaveBeenLastCalledWith(
                expectedResults.getCurrentFloor
            );
            expect(getPosition).toHaveBeenLastCalledWith(
                expectedResults.getPosition
            );
        });
    }
};

testFunction(cases, "move");
