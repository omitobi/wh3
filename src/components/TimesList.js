import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
                            <TableCell align="right">{row.startTime.format('HH:mm')}</TableCell>
                            <TableCell align="right">{row.endTime ? row.endTime.format('HH:mm') : '00:00'}</TableCell>
                            <TableCell align="right">{row.total ? row.total : '00:00'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TimesList;
