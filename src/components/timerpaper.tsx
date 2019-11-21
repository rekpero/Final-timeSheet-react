import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface ITimerPaperProps {
  hrs: number;
  minutes: number;
  timesheet: { id: number; project: any; phase: string };
  closeTimer: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper1: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: 8,
      width: 200
      //   padding: theme.spacing(4, 6, 6, 8),
    },
    project: {
      fontSize: 14,
      fontWeight: 550
    },
    phase: {
      fontSize: 12
    },
    time: {
      fontSize: 16,
      fontWeight: 600
    },
    close: {
      marginRight: 8
    }
  })
);

const TimerPaper: React.FC<ITimerPaperProps> = (props: ITimerPaperProps) => {
  const classes = useStyles();

  console.log(props.hrs, props.minutes, props.timesheet);
  return (
    <div>
      <Paper className={classes.paper1}>
        <Grid container direction="row" spacing={3} alignItems="center">
          <Grid item xs>
            <div className={classes.project}>{props.timesheet.project}</div>
            <div className={classes.phase}>{props.timesheet.phase}</div>
          </Grid>
          <Grid item xs className={classes.time}>
            {props.hrs}h {props.minutes}m
          </Grid>
          <Grid item xs={2} className={classes.close}>
            <CloseIcon fontSize="default" onClick={e => props.closeTimer()} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TimerPaper;
