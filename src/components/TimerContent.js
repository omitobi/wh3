import React, {useEffect, useState} from "react";
import CountDown from "./CountDown";
import TimesList from "./TimesList";
import Grid from "@material-ui/core/Grid";


const TimerContent = () => {
    const [timeRows, setTimeRows] = useState([]);

    useEffect(() => {
        const timeRowsStore = localStorage.getItem('timeRows');

        if (timeRowsStore !== null) {
            setTimeRows([...JSON.parse(timeRowsStore)]);
        }

    }, []);

    const addToTimes = (time) => {

        const initialTimeRows = timeRows;

        let latestItem = getFirstItem();

        if (latestItem === undefined || latestItem.endTime) {
            let timeRow = {};
            console.log('Creating new row with ', time.format('YYYY-MM-DD HH:mm'));
            timeRow.id = Math.random() + Math.random();
            timeRow.day = time.format('dddd');
            timeRow.startTime = time;
            timeRow.endTime = null;
            timeRow.total = 0;
            setTimeRows([timeRow, ...timeRows]);
        }

        if (latestItem && !latestItem.endTime) {
            console.log("Updating old row with end time", time.format("YYYY-MM-DD HH:mm"));
            latestItem.endTime = time;
            latestItem.total = time.diff(latestItem.startTime, "minutes");
            initialTimeRows[getFirstItemKey()] = latestItem;
            setTimeRows([...initialTimeRows]);
        }

        localStorage.setItem("timeRows", JSON.stringify(timeRows));
        console.log(localStorage.getItem("timeRows"))
    };

    const getFirstItem = () => {
        return timeRows[getFirstItemKey()];
    };

    const getFirstItemKey = () => {
        return 0;
    };

    return (
        <Grid item>
            <CountDown addToTimes={addToTimes}/>
            <div style={{marginLeft: "50px", marginRight: "50px", marginTop: "20px"}}>
                <TimesList timeRows={timeRows}/>
            </div>
        </Grid>
    );
};

export default TimerContent;