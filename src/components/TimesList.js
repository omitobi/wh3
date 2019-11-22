import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const TimesList = ({timeRows}) => {
    const classes = useStyles();

    const getTotalString = (totalMinutes) => {
        let elapsedHour = Math.floor(totalMinutes / 60);
        let elapsedMinutes = totalMinutes % 60;
        let totalString = elapsedHour + ":";

        if (elapsedMinutes < 10) {
            totalString += "0";
        }

        totalString += elapsedMinutes;

        return totalString;
    };

    const getStartTimeString = (startTime) => {
        return moment(startTime).format("HH:mm");
    };

    const getEndTimeString = (endTime) => {
        if (!endTime) {
            return "00:00";
        }

        return moment(endTime).format("HH:mm");
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End&nbsp;</TableCell>
                        <TableCell align="right">Total&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeRows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.day}
                            </TableCell>
                            <TableCell align="right">{getStartTimeString(row.startTime)}</TableCell>
                            <TableCell align="right">{getEndTimeString(row.endTime)}</TableCell>
                            <TableCell
                                align="right">{getTotalString(row.total)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TimesList;
