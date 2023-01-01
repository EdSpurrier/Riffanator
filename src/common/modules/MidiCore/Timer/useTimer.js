import { useCallback, useState } from "react";
import { interval } from "./interval";

let currentInterval = interval(1e3);

export const useTimer = ({
    timerTick: initialTimerTick = 0,
    running: initiallyRunning = false
} = {}) => {
    
    const [timerTick, setTimerTick] = useState(initialTimerTick);
    const [running, setRunning] = useState(initiallyRunning);

    const tick = useCallback(
        () => (running ? setTimerTick(timerTick => timerTick + 1) : undefined),
        [running]
    );

    const setInterval = (newInterval) => {
        currentInterval = interval(newInterval);
    };

    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = () => setTimerTick(0);
    const stop = () => {
        pause();
        reset();
    };

    currentInterval(tick);

    return { pause, reset, running, timerTick, start, stop, setInterval };
};