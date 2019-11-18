import React, { useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import moment from "moment";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import projectService from "../services/projectService";
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
  Typography,
  TextField
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";

interface IRegisterTimeModalProps {
  open: boolean;
  handleClose: () => void;
  buttonClicked: (
    hrs: number,
    min: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => void;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  timerId: number;
  projData: string;
  phase: string;
  note: string;
  hour: number;
  minute: number;
  date: string;
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
        width: 250,
        height: 350
      }
    },
    formControl: {
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(5),
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    time: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
      width: "100%"
    },
    calender: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(5),
      width: "100%"
    },
    button: {
      marginTop: theme.spacing(5),
      width: "100%"
    },
    title: {
      fontSize: 20,
      fontWeight: 600,
      marginLeft: theme.spacing(2)
    },
    note: {
      marginTop: theme.spacing(3)
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
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(moment().toDate())
  );
  var [hrs, setHrs] = React.useState(0);
  var [min, setMin] = React.useState(0);
  var [project, setProject] = React.useState("");
  var [projectId, setProjectId] = React.useState(0);
  var [phase, setPhase] = React.useState("");
  var [note, setNote] = React.useState("");
  var [proj, setProj] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleDateChange = (e: any) => {
    setSelectedDate(e);
  };
  const handleOpenProject = () => {
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
  const handleProjectName = (e: any) => {
    setProj(e.target.value);
    setProject(e.target.value.split("/")[0]);
    setProjectId(e.target.value.split("/")[1]);
    console.log(project);
  };
  const handlePhaseName = (e: any) => {
    setPhase(e.target.value);
    console.log(phase);
  };
  const handleNote = (e: any) => {
    setNote(e.target.value);
  };
  const addTimeSheet = () => {
    const project = props.project.filter(p => {
      return p.id === Number.parseInt(projectId + "");
    })[0];
    if (props.timerId !== -1) {
      projectService
        .updateTimesheetData(
          {
            project,
            phase,
            timeWorked:
              Number.parseInt(hrs + "") * 60 + Number.parseInt(min + ""),
            date: moment(new Date(selectedDate)).format("YYYY-MM-DD"),
            note
          },
          props.timerId
        )
        .subscribe(data => {
          console.log(data);
          props.handleClose();
        });
    } else {
      projectService
        .postTimesheetData({
          project,
          phase,
          timeWorked:
            Number.parseInt(hrs + "") * 60 + Number.parseInt(min + ""),
          date: moment(new Date(selectedDate)).format("YYYY-MM-DD"),
          note
        })
        .subscribe(data => {
          console.log(data);
          props.handleClose();
        });
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    setSelectedDate(
      props.date
        ? new Date(moment(props.date).toDate())
        : new Date(moment().toDate())
    );
    setHrs(props.hour);
    setMin(props.minute);
    setProject(props.projData.split("/")[0]);
    setProjectId(Number.parseInt(props.projData.split("/")[1]));
    setPhase(props.phase);
    setNote(props.note);
    setProj(props.projData);
    console.log(props.hour, props.minute);
  }, [props]);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1}>
            <AddCircleIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" className={classes.title}>
              Register Time
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Project</InputLabel>
              <Select
                native
                onChange={e => {
                  if (e.target.value === "create") {
                    handleOpenProject();
                  } else handleProjectName(e);
                }}
                value={proj}
              >
                {" "}
                <optgroup label="">
                  <option value="no selected">No Selection</option>
                  <option value="create">Create New Project</option>
                </optgroup>
                <optgroup label="">
                  {props.project.map((prop, key) => {
                    // console.log(prop);
                    return (
                      <option value={prop.name + "/" + prop.id}>
                        {prop.name}
                      </option>
                    );
                  })}
                </optgroup>
                <CreateProjectModal
                  project={props.project}
                  phases={props.phases}
                  timeSheet={props.timeSheet}
                  clients={props.clients}
                  open={open}
                  handleClose={handleClose}
                ></CreateProjectModal>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Phases</InputLabel>
              <Select native onChange={e => handlePhaseName(e)} value={phase}>
                {props.phases.map((prop, key) => {
                  // console.log(props.phases);
                  return <option value={prop.name}>{prop.name}</option>;
                })}
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
                    value={hrs}
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
                    value={min}
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
                format="yyyy-MM-dd"
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

        <Grid container direction="row">
          <TextField
            id="standard-full-width"
            className={classes.note}
            placeholder="Notes"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={note}
            onChange={e => handleNote(e)}
          />
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                if (hrs === 0 && min === 0) {
                  alert("enter time");
                } else {
                  props.buttonClicked(
                    hrs,
                    min,
                    { id: projectId, project, phase },
                    true
                  );
                  addTimeSheet();
                }
              }}
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
              onClick={e => addTimeSheet()}
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
