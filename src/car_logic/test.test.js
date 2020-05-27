import start from "./test";

jest.useFakeTimers();

test("test of intervals", done => {
    const callback = jest.fn(data => {
        try {
            done();
        } catch (error) {
            done(error);
        }
    });

    start(callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(10);
    expect(callback).toHaveBeenLastCalledWith(5);
});
