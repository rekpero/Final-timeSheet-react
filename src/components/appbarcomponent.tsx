import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import AddIcon from "@material-ui/icons/Add";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import CancelIcon from "@material-ui/icons/Cancel";
import RegisterTimeModal from "./registertimemodal";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      paddingTop: 0
    },
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

const AppBarComponent: React.FC<{}> = (props: any) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
        <div className={classes.grow} />
        <IconButton color="inherit">
          <TimerIcon></TimerIcon>
        </IconButton>
        <IconButton color="inherit">
          <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneIcon></NotificationsNoneIcon>
        </IconButton>

        <IconButton color="inherit" edge="end">
          <HelpOutlineIcon></HelpOutlineIcon>
        </IconButton>
      </Toolbar>
      <RegisterTimeModal
        open={open}
        handleClose={handleClose}
      ></RegisterTimeModal>
    </AppBar>
  );
};
export default AppBarComponent;
