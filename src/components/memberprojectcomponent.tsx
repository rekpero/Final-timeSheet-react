import React, { useState } from "react";
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

const useStyles = makeStyles({
  root: {
    width: "70%",
    overflowX: "auto",
    marginLeft: "15%"
  },
  table: {
    maxWidth: "100%"
  },
  button: {
    backgroundColor: "#32943d",
    color: "white",
    marginTop: "7px",
    marginBottom: "7px",
    marginLeft: "80%",
    paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "darkgreen"
    }
  }
});

function createData(
  cbox: boolean,
  name: string,
  budget: number,
  Hourlyrate: number,
  timetracked: number
) {
  return { cbox, name, budget, Hourlyrate, timetracked };
}
const rows = [createData(false, "Rohan", 25, 14, 159)];

//interface Row {
//    Budget: number
//}
// const budgettotal =(items:Array<Object>) => {
//    return items.map((props,key) =>props).reduce((sum, i) => sum + i, 0);
// }

// const invoicebudgettotal = budgettotal(rows);

const MemberProjectComponent: React.FC<{}> = (props: any) => {
  const classes = useStyles();
  const [stateRows, setStateRows] = useState(rows);

  const handleChange = (e: any, i: number) => {
    console.log(i, stateRows[i].cbox);
    stateRows[i].cbox = !stateRows[i].cbox;

    setStateRows(stateRows);
    console.log(i, stateRows);
  };

  return (
    <Paper className={classes.root}>
      <Grid item xs={7}></Grid>
      <Button variant="contained" size="large" className={classes.button}>
        Add new
      </Button>
      <Table className={classes.table} aria-label="simple table">
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
          {stateRows.map((row, i) => (
            <TableRow key={row.name} hover onClick={e => {}}>
              <TableCell>
                <Checkbox
                  value={row.cbox}
                  checked={row.cbox}
                  inputProps={{ "aria-labelledby": "checkbox in table" }}
                  color="primary"
                  onClick={e => handleChange(e, i)}
                />
              </TableCell>
              <TableCell component="th" scope="row" colSpan={3}>
                {row.name}
              </TableCell>
              <TableCell align="right">{row.budget}</TableCell>
              <TableCell align="right">{row.Hourlyrate}</TableCell>
              <TableCell align="right">{row.timetracked}</TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          <TableCell align="left">Project Budget</TableCell>
        </Grid>
        <Grid item xs={1}>
          <TableCell>10</TableCell>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Paper>
  );
};
export default MemberProjectComponent;
