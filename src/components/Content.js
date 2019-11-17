import React from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import CountDown from "./CountDown";
import TimesList from "./TimesList";

export default () => {
    return (
        <Grid item>
            <CountDown/>
            <div style={{marginLeft: "50px", marginRight: "50px", marginTop: "20px"}}>
                <TimesList/>
            </div>
        </Grid>

    );
}