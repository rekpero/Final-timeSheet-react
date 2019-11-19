import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IPhasesInfo } from "../model/phases";
import { IProjectTimeSheet } from "../model/timesheet";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: "70%",
    overflowX: "auto",
    marginLeft: "15%"
  },
  table: {
    maxWidth: "100%"
  }
});

interface IStatusPhasesProps {
  phases: IPhasesInfo[];
  timesheet: IProjectTimeSheet[];
}
const StatusPhasesComponent: React.FC<IStatusPhasesProps> = (
  props: IStatusPhasesProps
) => {
  const classes = useStyles();
  const getTimeFromMins = (mins: number) => {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)

    var h = (mins / 60) | 0,
      m = mins % 60 | 0;
    return moment
      .utc()
      .hours(h)
      .minutes(m)
      .format("hh:mm");
  };
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <h4>Phase</h4>
            </TableCell>
            <TableCell align="right">
              <h4>Time</h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.phases.map(row => {
            const filtered = props.timesheet.filter(
              (time: IProjectTimeSheet) => time.phase === row.name
            );
            return (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {getTimeFromMins(
                    filtered.length === 0
                      ? 0
                      : filtered
                          .map((time: IProjectTimeSheet) =>
                            Number.parseInt(time.timeWorked)
                          )
                          .reduce((prev, curr) => prev + curr)
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default StatusPhasesComponent;
