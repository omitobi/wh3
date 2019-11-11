import React, {useState} from 'react';
import moment from 'moment';

export default function CountDown() {
    const [timer, setTimer] = useState({
        timeElapsed: "0:00:00",
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
            started: timer.started,
        });

        let hour = Math.floor(totalSeconds / 3600);
        let minute = Math.floor((totalSeconds - hour * 3600) / 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        let seconds = totalSeconds - (hour * 3600 + minute * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        const timeElapsed = hour + ":" + minute + ":" + seconds;
        setTimer({
            timeElapsed,
            totalSeconds: totalSeconds,
            started: timer.started,
        });
    };

    return (
        <div>
            <input type="button" onClick={getTime} disabled={timer.started} value="Start timer"/>
            <em>{timer.timeElapsed}</em>
        </div>
    );

};