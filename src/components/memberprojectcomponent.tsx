import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox, Grid, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { IProjectTimeSheet } from "../model/timesheet";
import { IProjectInfo } from "../model/project";

//interface Row {
//    Budget: number
//}
// const budgettotal =(items:Array<Object>) => {
//    return items.map((props,key) =>props).reduce((sum, i) => sum + i, 0);
// }

// const invoicebudgettotal = budgettotal(rows);

interface IMemberProjectProps {
  project: IProjectInfo;
  timeSheets: IProjectTimeSheet[];
  classes: any;
}
interface IMemberProjectState {
  stateRows: {
    cbox: boolean;
    name: string;
    budget: number;
    hourlyrate: number;
    timetracked: number;
  }[];
  deleted: boolean;
}
class MemberProjectComponent extends React.Component<
  IMemberProjectProps,
  IMemberProjectState
> {
  constructor(props: IMemberProjectProps) {
    super(props);
    this.state = {
      stateRows: [],
      deleted: false
    };
  }

  componentDidUpdate() {
    if (
      this.props.project !== undefined &&
      this.props.timeSheets.length !== 0 &&
      this.state.stateRows.length === 0 &&
      !this.state.deleted
    ) {
      console.log(this.props.project);
      this.setState({
        stateRows: [
          {
            cbox: true,
            name:
              this.props.project === undefined
                ? ""
                : this.props.project.members.name,
            budget:
              this.props.project === undefined ? 0 : this.props.project.budget,
            hourlyrate:
              this.props.project === undefined
                ? 0
                : this.props.project.members.hourlyrate,
            timetracked:
              this.props.timeSheets.length === 0
                ? 0
                : this.props.timeSheets
                    .map(time => Number.parseInt(time.timeWorked))
                    .reduce((prev, curr) => prev + curr)
          }
        ]
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
    this.setState({ stateRows: this.state.stateRows, deleted: true }, () =>
      console.log(this.state.stateRows)
    );
  };

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PM</TableCell>
              <TableCell colSpan={3}>Name</TableCell>
              <TableCell align="right">Budget(hours)</TableCell>
              <TableCell align="right">Hourly rate</TableCell>
              <TableCell align="right">Time Tracked</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.stateRows.map((row: any, i: number) => (
              <TableRow key={row.name} hover onClick={e => {}}>
                <TableCell>
                  <Checkbox
                    value={row.cbox}
                    checked={row.cbox}
                    inputProps={{ "aria-labelledby": "checkbox in table" }}
                    color="primary"
                    onClick={e => this.handleChange(e, i)}
                  />
                </TableCell>
                <TableCell component="th" scope="row" colSpan={3}>
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.budget}</TableCell>
                <TableCell align="right">{row.hourlyrate}</TableCell>
                <TableCell align="right">{row.timetracked}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={e => this.deletePhase(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default MemberProjectComponent;
