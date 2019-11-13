import React from "react";
import Modal from "@material-ui/core/Modal";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import SaveIcon from "@material-ui/icons/Save";
import CreateProjectModal from "./createprojectmodal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import {
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  Input,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

interface IRegisterTimeModalProps {
  open: boolean;
  handleClose: () => void;
  buttonClicked: (hrs: number, min: number, timer: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper1: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8),
      [theme.breakpoints.down("sm")]: {
        width: 200,
        height: 100
      }
    },
    formControl: {
      marginRight: theme.spacing(5),
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    time: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(6),
      width: "100%"
    },
    calender: {
      marginTop: theme.spacing(6),
      marginRight: theme.spacing(5),
      width: "100%"
    },
    button: {
      margin: theme.spacing(3)
    }
  })
);

const RegisterTimeModal: React.FC<IRegisterTimeModalProps> = (
  props: IRegisterTimeModalProps
) => {
  const classes = useStyles();
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2019-11-11T23:11:54")
  );
  var [hrs, setHrs] = React.useState(0);
  var [min, setMin] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleDateChange = () => {
    console.log("Paras");
  };
  const handleOpen = () => {
    console.log("Paras");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTimeHrs = (e: any) => {
    setHrs(e.target.value);
  };
  const handleTimeMinutes = (e: any) => {
    setMin(e.target.value);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Typography variant="h4">
          <AddCircleIcon />
          Register Time
        </Typography>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Project</InputLabel>
              <Select
                native
                onChange={e => {
                  if (e.target.value === "create") {
                    handleOpen();
                  }
                }}
              >
                {" "}
                <option>No Selection</option>
                <option value="create">Create New Project</option>
                <CreateProjectModal
                  open={open}
                  handleClose={handleClose}
                ></CreateProjectModal>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Project</InputLabel>
              <Select native>
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <FormControl className={classes.time}>
                  <Input
                    id="standard-adornment-weight"
                    // value={values.weight}
                    onChange={handleTimeHrs}
                    endAdornment={
                      <InputAdornment position="end">h</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    // inputProps={{
                    //   'aria-label': 'weight',
                    // }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.time}>
                  <Input
                    id="standard-adornment-weight"
                    // value={values.weight}
                    onChange={handleTimeMinutes}
                    endAdornment={
                      <InputAdornment position="end">m</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    // inputProps={{
                    //   'aria-label': 'weight',
                    // }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
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
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<PlayArrowIcon />}
              onClick={() => props.buttonClicked(hrs, min, true)}
            >
              Timer
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default RegisterTimeModal;
