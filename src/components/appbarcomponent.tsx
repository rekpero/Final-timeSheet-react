import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import AddIcon from "@material-ui/icons/Add";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import Fab from "@material-ui/core/Fab";

import RegisterTimeModal from "./registertimemodal";
import { IconButton } from "@material-ui/core";
import EnteriesModal from "./enteriesmodal";
import TimerModal from "./timercomponent";
import TimerPaper from "./timerpaper";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";

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
    },
    timer: {
      position: "relative",
      marginRight: 18,
      width: 200
    }
  })
);
interface IAppBarProps {
  setTimer: (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => void;
  openTimer: boolean;
  hrs: number;
  min: number;
  timesheet: { id: number; project: string; phase: string };
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  timerId: number;
  projData: string;
  phase: string;
  note: string;
  hour: number;
  minute: number;
  date: string;
  editTimerOpen: boolean;
  openTimerEdit: () => void;
  closeEditTimer: () => void;
}
const AppBarComponent: React.FC<IAppBarProps> = (props: IAppBarProps) => {
  const classes = useStyles();
  const [showTimer, setTimer] = React.useState(false);
  var [hrs, setHrs] = React.useState(0);
  var [min, setMin] = React.useState(0);
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => {
    setOpenRegisterModal(true);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleCloseModal = () => {
    setOpenRegisterModal(false);
  };
  // const showTimerPaper = () => {
  //   setTimer(props.showTimer);
  // };

  console.log(props.project);
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={props.openTimerEdit}
        >
          <AddIcon />
        </Fab>

        <div className={classes.grow} />
        {props.openTimer ? (
          <IconButton color="inherit" className={classes.timer}>
            <TimerPaper
              hrs={props.hrs}
              minutes={props.min}
              timesheet={props.timesheet}
            />
          </IconButton>
        ) : null}
        <IconButton color="inherit">
          <TimerIcon onClick={handleOpen2}></TimerIcon>
          <EnteriesModal
            open={open1}
            handleClose={handleClose1}
          ></EnteriesModal>
          <TimerModal open={open2} handleClose={handleClose2}></TimerModal>
        </IconButton>
        <IconButton color="inherit">
          <CheckCircleOutlineIcon
            onClick={handleOpen1}
          ></CheckCircleOutlineIcon>
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneIcon></NotificationsNoneIcon>
        </IconButton>

        <IconButton color="inherit" edge="end">
          <HelpOutlineIcon></HelpOutlineIcon>
        </IconButton>
      </Toolbar>
      <RegisterTimeModal
        clientData={props.clientData}
        projectData={props.projectData}
        phaseData={props.phaseData}
        timesheetData={props.timesheetData}
        open={props.editTimerOpen}
        handleClose={props.closeEditTimer}
        buttonClicked={props.setTimer}
        project={props.project}
        clients={props.clients}
        phases={props.phases}
        timeSheet={props.timeSheet}
        timerId={props.timerId}
        projData={props.projData}
        phase={props.phase}
        note={props.note}
        hour={props.hour}
        minute={props.minute}
        date={props.date}
      ></RegisterTimeModal>
    </AppBar>
  );
};
export default AppBarComponent;
