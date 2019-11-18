import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    overflowX: "auto",
    padding: 24
  }
});

const ActivityLogComponent: React.FC<{}> = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <b>Data </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b>Activity </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {" "}
                25/09/19
              </TableCell>
              <TableCell> Demo </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};
export default ActivityLogComponent;
