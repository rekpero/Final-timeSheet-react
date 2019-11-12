import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      paddingBottom: 50
    },
    list: {
      marginBottom: theme.spacing(2)
    },
    subheader: {
      backgroundColor: theme.palette.background.paper
    },
    appBar: {
      paddingTop: 0
    },
    grow: {
      flexGrow: 1
    },
    timer: { paddingLeft: 680 },
    check: { paddingLeft: 100 },
    noti: { paddingLeft: 400 },
    help: { paddingLeft: 200 },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: 20,
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  })
);

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <TimerIcon className={classes.timer}></TimerIcon>
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon />
        </Fab>

        <CheckCircleOutlineIcon
          className={classes.check}
        ></CheckCircleOutlineIcon>
        <NotificationsNoneIcon className={classes.noti}></NotificationsNoneIcon>
        <HelpOutlineIcon className={classes.help}></HelpOutlineIcon>
      </Toolbar>
    </AppBar>
  );
}
