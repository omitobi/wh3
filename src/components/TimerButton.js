import React from 'react';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const TimerButton = ({started, toggleTimer}) => {

    return (
        <div>
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" aria-label="split button">
                    {
                        started
                            ? <Button color="secondary" onClick={() => toggleTimer('stop')}>Stop timer</Button>
                            : <Button onClick={() => toggleTimer('start')}>Start timer</Button>
                    }
                </ButtonGroup>
            </Grid>
        </div>
    );
};

export default TimerButton;