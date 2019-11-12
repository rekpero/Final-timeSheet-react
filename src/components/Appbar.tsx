import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";

import CancelIcon from "@material-ui/icons/Cancel";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  FormHelperText,
  Input,
  Button,
  Icon
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    paper1: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8)
    },
    formControl: {
      margin: theme.spacing(1),
      maxWidth: 100
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    time: {
      maxWidth: 25,
      paddingLeft: 5
    },
    calender: { width: 100, height: 20, paddingTop: 0 },
    button: {
      margin: theme.spacing(1)
    }
  })
);
function rand() {
  return Math.round(Math.random() * 10) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function BottomAppBar() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2019-11-11T23:11:54")
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDateChange = () => {
    console.log("Paras");
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <TimerIcon className={classes.timer}></TimerIcon>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper1}>
            <div style={{ backgroundColor: "black" }}>
              {" "}
              <h2 id="simple-modal-title">Register Time</h2>
            </div>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Project</InputLabel>
              <Select native>
                <option value="" />
                <option>
                  <Icon color="secondary">add_circle</Icon>
                </option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Project</InputLabel>
              <Select native>
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <br></br>
            <br></br>
            <FormControl className={classes.time}>
              <Input
                id="standard-adornment-weight"
                // value={values.weight}
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">h</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                // inputProps={{
                //   'aria-label': 'weight',
                // }}
              />
            </FormControl>

            <FormControl className={classes.time}>
              <Input
                id="standard-adornment-weight"
                // value={values.weight}
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">m</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                // inputProps={{
                //   'aria-label': 'weight',
                // }}
              />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.calender}
                disableToolbar
                // variant="inline"
                format="MM/dd/yyyy"
                // margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={handleDateChange}
                // KeyboardButtonProps={{
                //   'aria-label': 'change date',
                // }}
              />
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            ></Button>
          </div>
        </Modal>

        <CheckCircleOutlineIcon
          className={classes.check}
        ></CheckCircleOutlineIcon>
        <NotificationsNoneIcon className={classes.noti}></NotificationsNoneIcon>
        <HelpOutlineIcon className={classes.help}></HelpOutlineIcon>
      </Toolbar>
    </AppBar>
  );
}
export default BottomAppBar;
