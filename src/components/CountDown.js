import React, {useState, useRef} from 'react';
import CountDownStyle from './../styles/CountDownStyle'
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import moment from "moment";

const initialState = {
    timeElapsed: {
        hour: 0,
        minute: 0,
        seconds: 0
    },
    totalSeconds: 0,
    interval: null,
    started: false,
};

const CountDown = ({addToTimes}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [timer, setTimer] = useState(initialState);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const startTimer = () => {
        setStarted(true);
        addToTimes(moment());
        timer.interval = setInterval(countTimer, 1000);
    };

    const stopTimer = () => {
        clearInterval(timer.interval);
        addToTimes(moment());
        setTimer(initialState);
    };

    const countTimer = () => {
        let totalSeconds = ++timer.totalSeconds;

        setTotalSeconds(totalSeconds);

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

    const setStarted = (status) => {
        setTimer({
            totalSeconds: timer.totalSeconds,
            timeElapsed: timer.timeElapsed,
            interval: timer.interval,
            started: status,
        });
    };

    const setTotalSeconds = (seconds) => {
        setTimer({
            totalSeconds: seconds,
            timeElapsed: timer.timeElapsed,
            interval: timer.interval,
            started: timer.started,
        });
    };

    const getHour = (totalSeconds) => {
        return Math.floor(totalSeconds / 3600);
    };

    const getMinute = (totalSeconds, hour) => {
        return Math.floor((totalSeconds - hour * 3600) / 60);
    };

    const getSeconds = (totalSeconds, hour, minute) => {
        return totalSeconds - (hour * 3600 + minute * 60);
    };

    const getFullTimeString = () => {
        let timerString = timer.timeElapsed.hour + ":";

        if (timer.timeElapsed.minute < 10) {
            timerString += "0";
        }

        timerString += timer.timeElapsed.minute + ":"


        if (timer.timeElapsed.seconds < 10) {
            timerString += "0";
        }

        timerString += timer.timeElapsed.seconds;

        return timerString;
    };

    return (
        <div style={CountDownStyle.center}>
            <Grid container direction="column" alignItems="center">
                <Paper variant="h3" component="h1">{getFullTimeString()}</Paper>

                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        {
                            timer.started
                                ? <Button color="secondary" onClick={stopTimer}>Stop timer</Button>
                                : <Button onClick={startTimer}>Start timer</Button>
                        }

                        <Button
                            color="default"
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon/>
                        </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu">
                                            <MenuItem>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        label={timer.started ? "Pick End Time" : "Pick Start Time"}
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}/>
                                                </MuiPickersUtilsProvider>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Grid>
        </div>
    );
};

export default CountDown;