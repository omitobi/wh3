import React, {useState} from "react";
import CountDown from "./CountDown";
import TimesList from "./TimesList";
import Grid from "@material-ui/core/Grid";


const TimerContent = () => {
    const [timeRows, setTimeRows] = useState([]);

    const addToTimes = (time) => {
        const initialTimeRows = timeRows;
        let timeRow = {};
        const lastItem = getLastItem();

        console.log('addToTimes old row with end time', getLastItemKey());
        if (lastItem === undefined || lastItem.endTime !== null) {
            console.log('Creating new row with ', time.format('YYYY-MM-DD HH:mm'));
            timeRow.id = Math.random() + Math.random();
            timeRow.day = time.format('D');
            timeRow.startTime = time;
            timeRow.endTime = null;
            timeRow.total = null;
            setTimeRows([timeRow, ...timeRows]);

        }
        if (lastItem && lastItem.endTime === null) {
            console.log('Updating old row with end time ', time.format('YYYY-MM-DD HH:mm'));
            lastItem.endTime = time;
            lastItem.total = time.diff(lastItem.startTime);
            initialTimeRows[getLastItemKey()] = lastItem;
            setTimeRows([...initialTimeRows]);
        }
    };

    function createTimeRow(day, startTime, endTime, Total) {
        return {day, startTime, endTime, Total};
    }

    const getLastItem = () => {
        return timeRows[getLastItemKey()];
    };

    const getLastItemKey = () => {
        return timeRows.length - 1
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