// import animation from "./animation";

// const { start } = animation(
//     getCarState,
//     getCurrentFloor,
//     getPosition,
//     updateCarState,
//     setIntervalId,
// );

// jest.useFakeTimers();

// test("animation", done => {
//     const target = 13;
//     const currentFloor = 0;
//     const getFloor = jest.fn(() => {
//         try {
//             done();
//         } catch (error) {
//             done(error);
//         }
//     });
//     const getPosition = jest.fn(() => {
//         try {
//             done();
//         } catch (error) {
//             done(error);
//         }
//     });

//     start(
//         targetFloor,
//         currentFloor,
//         currentPosition,
//         intervalId,
//         carId
//     );

//     jest.runAllTimers();
//     expect(getFloor).toHaveBeenLastCalledWith(target);
//     expect(getPosition).toHaveBeenLastCalledWith(target * 100);
// });
