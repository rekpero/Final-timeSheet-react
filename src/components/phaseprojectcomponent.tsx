import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox } from "@material-ui/core";

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

function createData(cbox: boolean, name: string, budget:number, project: number) {
    return { cbox, name, budget, project };
}

var checkboxValue= false;
var rows = [
createData(false, "AT&T Dev", 14, 159),
createData(false, "AT&T Maintenance", 16, 237),
createData(true, "Metlife Marketing", 13, 262)
];

const PhaseProjectComponent: React.FC<{}> = (props: any) => {
    const classes = useStyles();
    const [stateRows, setStateRows] = useState(rows)

    const handleChange=(e: any, i: number) => {
    console.log(i, stateRows[i].cbox)
    stateRows[i].cbox = !stateRows[i].cbox
    setStateRows(stateRows)
    console.log(i, stateRows)
    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell>
                Active
                </TableCell>
                <TableCell>
                Name
                </TableCell>
                <TableCell>
                Category
                </TableCell>
                <TableCell align="right">
                Budget
                </TableCell>
                <TableCell align="right">
                Time Tracked
                </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                </TableRow>
                {stateRows.map((row, i) => (
                <TableRow
                key={row.name}
                hover
                onClick={e => {
                }}
                >



                <TableCell>
                <Checkbox
                value={row.cbox}
                checked={row.cbox}
                inputProps={{ 'aria-labelledby': "checkbox in table" }}
                color= "primary"
                onClick={e => handleChange(e, i)}
                />
                </TableCell>
                <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                <TableCell >
                askjdnek
                </TableCell>
                <TableCell align= "right">{row.budget}</TableCell>
                <TableCell align="right">{row.project}</TableCell>
                </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
export default PhaseProjectComponent;