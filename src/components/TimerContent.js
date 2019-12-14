import React, {useEffect, useState} from "react";
import TimeLogStore from "../stores/TimeLogStore";
import CountDown from "./CountDown";
import TimesList from "./TimesList";
import Grid from "@material-ui/core/Grid";
import TimerButton from "./TimerButton";
import CountDownStyle from "../styles/CountDownStyle";
import moment from "moment";

const getLatestTimeRow = () => {
    const timeLogs = TimeLogStore();

    const latestTimeRow = timeLogs[0];

    return latestTimeRow ? latestTimeRow : {
        startTime: null,
        endTime: null
    };
};

const getFirstItem = (timeRows) => {
    return timeRows[getFirstItemKey()];
};

const getFirstItemKey = () => {
    return 0;
};

const TimerContent = () => {
    const [timeRows, setTimeRows] = useState([]);
    const [action, setAction] = useState(null);
    const [at, setAt] = useState(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeRowStore = TimeLogStore();

        if (timeRowStore) {
            setTimeRows(timeRowStore);

            const latestTimeRow = getLatestTimeRow();

            if (latestTimeRow.startTime && !latestTimeRow.endTime) {
                const totalSeconds = moment().diff(moment(latestTimeRow.startTime), 'seconds');
                setAction('start');
                setStarted(true);
                setAt(totalSeconds);
            }
        }

    }, []);

    const addToTimes = (time) => {

        let initialTimeRows = timeRows;

        let latestItem = getFirstItem(timeRows);

        if (latestItem === undefined || latestItem.endTime) {
            let timeRow = {};
            console.log('Creating new row with ', time.format('YYYY-MM-DD HH:mm'));
            timeRow.id = Math.random() + Math.random();
            timeRow.day = time.format('dddd');
            timeRow.startTime = time;
            timeRow.endTime = null;
            timeRow.total = 0;
            initialTimeRows = [timeRow, ...timeRows];
            setTimeRows(initialTimeRows);
        }

        if (latestItem && !latestItem.endTime) {
            console.log("Updating old row with end time", time.format("YYYY-MM-DD HH:mm"));
            latestItem.endTime = time;
            latestItem.total = time.diff(latestItem.startTime, "minutes");
            initialTimeRows[getFirstItemKey()] = latestItem;
            setTimeRows([...initialTimeRows]);
        }

        localStorage.setItem("timeRows", JSON.stringify(initialTimeRows));

        console.log(JSON.parse(localStorage.getItem("timeRows")));
    };

    const toggle = (action, time) => {
        console.log('We receive a toggle(action, time)', action, time);

        setAction(action);
        addToTimes(moment(time));

        if (action === "start") {
            setStarted(true);
            setAt(moment().diff(moment(time), 'seconds'));
        }

        if (action === "stop") {
            setStarted(false);
        }
    };

    return (
        <Grid item>
            <div style={CountDownStyle.center}>
                <Grid container direction="column" alignItems="center">
                    <CountDown at={at} action={action}/>
                    <TimerButton started={started} toggleTimer={toggle}/>
                </Grid>
            </div>
            <div style={{marginLeft: "50px", marginRight: "50px", marginTop: "20px"}}>
                <TimesList timeRows={timeRows}/>
            </div>
        </Grid>
    );
};

export default TimerContent;