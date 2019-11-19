import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IProjectInfo } from "../model/project";

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
interface IStatusProjectComponent {
  projects: IProjectInfo[];
}
const StatusProjectComponent: React.FC<IStatusProjectComponent> = (
  props: IStatusProjectComponent
) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <h4>Project</h4>
            </TableCell>
            <TableCell align="right">
              <h4>Budget</h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.projects
            .map((proj: IProjectInfo) => ({
              name: proj.name,
              budget: proj.budget
            }))
            .map((row: { name: string; budget: number }) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.budget}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default StatusProjectComponent;
