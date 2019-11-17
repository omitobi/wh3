import React, {useState} from 'react';
import moment from 'moment';

export default function CountDown() {
    const [timer, setTimer] = useState({
        timeElapsed: {
            hour: "0",
            minute: "00",
            seconds: "00"
        },
        totalSeconds: 0,
        started: false,
    });

    const getTime = () => {
        setInterval(countTimer, 1000);
    };

    const countTimer = () => {
        let totalSeconds = ++timer.totalSeconds;

        setTimer({
            totalSeconds: totalSeconds,
            timeElapsed: timer.timeElapsed,
            started: true,
        });

        let hour = getHour(totalSeconds);
        let minute = getMinute(totalSeconds, hour);
        let seconds = getSeconds(totalSeconds, hour, minute);

        setTimer({
            timeElapsed: {hour, minute, seconds},
            totalSeconds: totalSeconds,
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
            <input type="button" onClick={getTime} disabled={timer.started} value="Start timer"/>
            <em>{getFullTimeString()}</em>
        </div>
    );

};