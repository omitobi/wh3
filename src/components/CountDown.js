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
import moment from 'moment';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function CountDown() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

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
        setStarted(true);
        timer.interval = setInterval(countTimer, 1000);
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

    const stopTimer = () => {
        clearInterval(timer.interval);
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
        <div style={CountDownStyle.center}>
            <Grid container direction="column" alignItems="center">
                <Paper variant="h3" component="h1">{getFullTimeString()}</Paper>

                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        {
                            timer.started
                                ? <Button color="secondary" onClick={stopTimer}>End Time</Button>
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
                                            {
                                                timer.started
                                                    ? <MenuItem disabled={!timer.started}
                                                        // selected={true}
                                                        // onClick={event => startTimer()}
                                                    >
                                                        Pick End time
                                                    </MenuItem>
                                                    : <MenuItem disabled={timer.started}
                                                        // selected={true}
                                                        // onClick={event => startTimer()}
                                                    >
                                                        Pick Start time
                                                    </MenuItem>
                                            }


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