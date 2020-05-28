import animation from "./animation";

const { start } = animation();

jest.useFakeTimers();

test("animation", done => {
    const target = 13;
    const currentFloor = 0;
    const getFloor = jest.fn(() => {
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

    start(target, currentFloor, getFloor, getPosition);

    jest.runAllTimers();
    expect(getFloor).toHaveBeenLastCalledWith(target);
    expect(getPosition).toHaveBeenLastCalledWith(target * 100);
});
