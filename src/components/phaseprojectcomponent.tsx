import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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

function createData(
  cbox: boolean,
  name: string,
  budget: number,
  project: number
) {
  return { cbox, name, budget, project };
}

interface IPhaseProjectProps {
  phases: IPhasesInfo[];
  timeSheets: IProjectTimeSheet[];
}

const PhaseProjectComponent: React.FC<IPhaseProjectProps> = (
  props: IPhaseProjectProps
) => {
  const classes = useStyles();

  const [stateRows, setStateRows] = useState(
    props.phases.map(phase => {
      const filteredTimeSheet = props.timeSheets.filter(
        time => time.phase === phase.name
      );
      return {
        cbox: true,
        name: phase.name,
        timeTracked:
          filteredTimeSheet.length === 0
            ? 0
            : filteredTimeSheet
                .map(time => Number.parseInt(time.timeWorked))
                .reduce((prev, curr) => prev + curr)
      };
    })
  );

  useEffect(() => {
    setStateRows(
      props.phases.map(phase => {
        const filteredTimeSheet = props.timeSheets.filter(
          time => time.phase === phase.name
        );
        return {
          cbox: true,
          name: phase.name,
          timeTracked:
            filteredTimeSheet.length === 0
              ? 0
              : filteredTimeSheet
                  .map(time => Number.parseInt(time.timeWorked))
                  .reduce((prev, curr) => prev + curr)
        };
      })
    );
  }, [props]);

  const handleChange = (e: any, i: number) => {
    console.log(i, stateRows[i].cbox);
    stateRows[i].cbox = !stateRows[i].cbox;
    setStateRows(stateRows);
    console.log(i, stateRows);
  };

  const deletePhase = (i: number) => {
    if (stateRows.length !== 0) {
      stateRows.splice(i, 1);
    }
    setStateRows(stateRows);
    console.log(stateRows);
  };

  const getTimeFromMins = (mins: number) => {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    if (mins >= 24 * 60 || mins < 0) {
      throw new RangeError(
        "Valid input should be greater than or equal to 0 and less than 1440."
      );
    }
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
            <TableCell>Active</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Time Tracked</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stateRows.map((row, i) => (
            <TableRow key={row.name} hover>
              <TableCell>
                <Checkbox
                  value={row.cbox}
                  checked={row.cbox}
                  inputProps={{ "aria-labelledby": "checkbox in table" }}
                  color="primary"
                  onClick={e => handleChange(e, i)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{getTimeFromMins(row.timeTracked)}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" onClick={e => deletePhase(i)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default PhaseProjectComponent;
