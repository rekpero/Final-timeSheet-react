import React from "react";
import Modal from "@material-ui/core/Modal";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { IProjectTimeSheet } from "../model/timesheet";
interface ItimerModalProps {
  open: boolean;
  handleClose: () => void;
  data: IProjectTimeSheet[];
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
    paper2: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: 8,
      width: 400
      //   padding: theme.spacing(4, 6, 6, 8),
    },

    selectEmpty: {
      marginTop: theme.spacing(2)
    },

    button: {
      margin: theme.spacing(3)
    }
  })
);

const TimerModal: React.FC<ItimerModalProps> = (props: ItimerModalProps) => {
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

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <TimerIcon />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">Enteries</Typography>
          </Grid>
        </Grid>
        <hr></hr>

        {props.data.map((prop, key) => {
          return (
            <div>
              <Paper className={classes.paper2}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4}>
                    {" "}
                    {prop.project.name}
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={4}>
                    {prop.phase}
                  </Grid>
                  <Grid item xs={1}></Grid>

                  <Grid item xs={2}>
                    {(prop.project.budget * 60 - prop.timeWorked) / 60} Minutes
                    Left
                  </Grid>
                </Grid>
              </Paper>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default TimerModal;
