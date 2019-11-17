import React, {useState} from 'react';
import moment from 'moment';

export default function CountDown() {
    const initialState = {
        timeElapsed: {
            hour: "0",
            minute: "00",
            seconds: "00"
        },
        totalSeconds: 0,
        interval: null,
        started: false,
    };

    const [timer, setTimer] = useState(initialState);

    const startTimer = () => {
        timer.interval = setInterval(countTimer, 1000);
    };

    const stopTimer = () => {
        clearInterval(timer.interval);
        setTimer(initialState);
    };

    const countTimer = () => {
        let totalSeconds = ++timer.totalSeconds;

        setTimer({
            totalSeconds: totalSeconds,
            timeElapsed: timer.timeElapsed,
            interval: timer.interval,
            started: true,
        });

        let hour = getHour(totalSeconds);
        let minute = getMinute(totalSeconds, hour);
        let seconds = getSeconds(totalSeconds, hour, minute);

        setTimer({
            timeElapsed: {hour, minute, seconds},
            totalSeconds: totalSeconds,
            interval: timer.interval,
            started: true,
        });
    };

    const getHour = (totalSeconds) => {
        return Math.floor(totalSeconds / 3600);
    };

    const getMinute = (totalSeconds, hour) => {
        let minute = Math.floor((totalSeconds - hour * 3600) / 60);
        if (minute < 10) {
            minute = "0" + minute;
        }

        return minute;
    };

    const getSeconds = (totalSeconds, hour, minute) => {
        let seconds = totalSeconds - (hour * 3600 + minute * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return seconds;
    };

    const getFullTimeString = () => {
        return timer.timeElapsed.hour + ":" + timer.timeElapsed.minute + ":" + timer.timeElapsed.seconds;
    };

    return (
        <div>

            {
                timer.started
                    ? <input type="button" onClick={stopTimer} value="Stop timer"/>
                    :
                    <input type="button" onClick={startTimer} value="Start timer"/>
            }
            <em>{getFullTimeString()}</em>
        </div>
    );
};