import React from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import CountDown from "./CountDown";

export default () => {
    return (
        <Grid>
            <Typography itemType="h1">Chilling</Typography>
            <CountDown/>
        </Grid>

    );
}