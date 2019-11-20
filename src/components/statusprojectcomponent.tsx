import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IProjectInfo } from "../model/project";
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
interface IStatusProjectComponent {
  projects: IProjectInfo[];
}
const StatusProjectComponent: React.FC<IStatusProjectComponent> = (
  props: IStatusProjectComponent
) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center">
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
    </Grid>
  );
};
export default StatusProjectComponent;
