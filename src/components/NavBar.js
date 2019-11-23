import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu'
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import FeedbackIcon from '@material-ui/icons/Feedback';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

function NavBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [side]: open});
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><HistoryIcon/></ListItemIcon>
                    <ListItemText primary="History"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><BeachAccessIcon/></ListItemIcon>
                    <ListItemText primary="Vacation"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LocalHospitalIcon/></ListItemIcon>
                    <ListItemText primary="Sick Leave"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon><FeedbackIcon/></ListItemIcon>
                    <ListItemText primary="Feedback"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><HelpIcon/></ListItemIcon>
                    <ListItemText primary="Help"/>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit" aria-label="menu"
                        onClick={toggleDrawer('left', true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                        {sideList('left')}
                    </Drawer>
                    <Typography variant="h6" className={classes.title}>
                        Working Hours 3.0
                    </Typography>
                    <ProfileMenu/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;