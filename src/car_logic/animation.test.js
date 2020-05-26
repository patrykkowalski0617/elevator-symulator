import animation from "./animation";

const { start } = animation(15);

jest.useFakeTimers();

test("animation", () => {
    const target = 13;
    const currentFloor = 0;
    const getFloor = jest.fn(state => {
        state++;
        return state;
    });
    const getPosition = jest.fn(position => {
        position++;
    });

    start(target, currentFloor, getFloor, getPosition);
    jest.runAllTimers();
    expect(getFloor).toHaveBeenCalledTimes(target);
    expect(getPosition).toHaveBeenCalledTimes(target * 100);
});
