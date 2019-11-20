import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import history from "../services/history";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import moment from "moment";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "70%",
    overflowX: "auto"
  },
  table: {
    maxWidth: "100%"
  }
});

interface IStatusClientsProps {
  clients: IClientInfo[];
  timesheets: IProjectTimeSheet[];
}

const StatusClientsComponent: React.FC<IStatusClientsProps> = (
  props: IStatusClientsProps
) => {
  const classes = useStyles();

  const getTimeFromMins = (mins: number) => {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    console.log(mins);
    if (mins === 0) return "00:00";
    let h = (mins / 60) | 0,
      m = mins % 60 | 0;
    let hour = h < 10 ? "0" + h : h;
    let min = m < 10 ? "0" + m : m;
    let time = hour + ":" + min;
    return time;
  };

  return (
    <Grid container direction="row" justify="center">
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Name</h4>
              </TableCell>
              <TableCell align="left">
                <h4>Project</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Budget</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.clients.map((row: IClientInfo, i: number) => {
              const filtered = props.timesheets.filter(
                (time: IProjectTimeSheet) => {
                  return time.project.clientId === row.id;
                }
              );
              // console.log(filtered);
              return (
                <TableRow key={i} hover>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.noOfProjects}</TableCell>
                  <TableCell align="right">
                    {getTimeFromMins(
                      filtered.length === 0
                        ? 0
                        : filtered
                            .map((time: IProjectTimeSheet) => time.timeWorked)
                            .reduce((prev, curr) => prev + curr)
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};
export default StatusClientsComponent;
