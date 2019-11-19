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

interface IPhaseProjectState {
  stateRows: { cbox: boolean; name: string; timeTracked: number }[];
}

interface IPhaseProjectProps {
  phases: IPhasesInfo[];
  timeSheets: IProjectTimeSheet[];
  classes: any;
}

class PhaseProjectComponent extends React.Component<
  IPhaseProjectProps,
  IPhaseProjectState
> {
  constructor(props: IPhaseProjectProps) {
    super(props);
    this.state = {
      stateRows: props.phases.map(phase => {
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
    };
  }

  componentDidUpdate() {
    if (this.props.phases.length !== 0 && this.state.stateRows.length === 0) {
      console.log(this.props.phases);
      this.setState({
        stateRows: this.props.phases.map(phase => {
          const filteredTimeSheet = this.props.timeSheets.filter(
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
      });
    }
  }

  handleChange = (e: any, i: number) => {
    console.log(i, this.state.stateRows[i].cbox);
    this.state.stateRows[i].cbox = !this.state.stateRows[i].cbox;
    this.setState({ stateRows: this.state.stateRows });
    console.log(i, this.state.stateRows);
  };

  deletePhase = (i: number) => {
    if (this.state.stateRows.length !== 0) {
      this.state.stateRows.splice(i, 1);
    }
    this.setState({ stateRows: this.state.stateRows });
    console.log(this.state.stateRows);
  };

  getTimeFromMins = (mins: number) => {
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

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Active</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Time Tracked</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.stateRows.map(
              (
                row: { cbox: boolean; name: string; timeTracked: number },
                i: number
              ) => (
                <TableRow key={row.name} hover>
                  <TableCell>
                    <Checkbox
                      value={row.cbox}
                      checked={row.cbox}
                      inputProps={{ "aria-labelledby": "checkbox in table" }}
                      color="primary"
                      onClick={e => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{this.getTimeFromMins(row.timeTracked)}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={e => this.deletePhase(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default PhaseProjectComponent;
