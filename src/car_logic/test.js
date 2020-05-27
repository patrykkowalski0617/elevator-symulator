export default function start(callback) {
    let i = 0;
    let intervalId;

    intervalId = setInterval(() => {
        i += 0.5;
        callback(i);
        if (i >= 5) {
            clearInterval(intervalId);
        }
    }, 15);
}
