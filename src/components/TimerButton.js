import React, {useRef, useState} from 'react';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const TimerButton = ({started, toggleTimer}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleDateChange = date => {
        setSelectedDate(date);

        toggleTimer((started ? 'stop' : 'start'), date);
    };

    const handleSubItemClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        if (event.target.textContent !== "OK") {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                {
                    started
                        ? <Button color="secondary" onClick={() => toggleTimer('stop')}>Stop timer</Button>
                        : <Button onClick={() => toggleTimer('start')}>Start timer</Button>
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
                            <ClickAwayListener onClickAway={handleSubItemClose}>
                                <MenuList id="split-button-menu">
                                    <MenuItem>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                label={started ? "Pick End Time" : "Pick Start Time"}
                                                value={selectedDate}
                                                onOpen={null}
                                                onClose={null}
                                                onChange={handleDateChange}
                                                variant="dialog"
                                                onAccept={null}
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
        </div>
    );
};

export default TimerButton;