import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

interface ITimerPaperProps {
  hrs: number;
  minutes: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper1: {
      position: "absolute",
      width: 100,
      height: 50,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5]
      //   padding: theme.spacing(4, 6, 6, 8),
    }
  })
);

const TimerPaper: React.FC<ITimerPaperProps> = (props: ITimerPaperProps) => {
  const classes = useStyles();
  var [hrs, setHrs] = React.useState(props.hrs);
  var [min, setMin] = React.useState(props.minutes);
  var intervalHandle: NodeJS.Timeout;

  function tick() {
    if (min === 0) {
      setHrs(hrs - 1);
      setMin(60);
    }
    if (min === 0 && hrs === 0) {
      clearInterval(intervalHandle);
    }
    setMin(min--);
  }
  function startCountDown() {
    intervalHandle = setInterval(tick, 60000);
  }
  startCountDown();

  return (
    <div>
      <Paper className={classes.paper1}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            {hrs}:
          </Grid>
          <Grid item xs>
            {min}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TimerPaper;
