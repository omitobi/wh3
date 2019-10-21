import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";

function NavBar() {
    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <HomeIcon fontSize="small" style={{ "marginBottom": "0.4em"}}/>
                <Typography gutterBottom variant="h6">
                    | Working Hours <strong>3.0</strong>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;