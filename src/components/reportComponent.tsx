import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import { IProjectTimeSheet } from "../model/timesheet";
import { IClientInfo } from "../model/clients";
import { IPhasesInfo } from "../model/phases";
import { IProjectInfo } from "../model/project";
import BarChart from "./bar";
import Chart from "./dougnutChart";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginLeft: theme.spacing(10),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    chart: {
      width: 300,
      height: 300,
      marginLeft: 10
    },
    pie: {
      marginRight: 5,
      marginTop: 5
    }
  })
);
interface ReportProps {
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  classes: any;
}
// interface chartDataState {
//   Budget: number;
//   TimeWorked:number;
// }
const ReportComponent: React.FC<ReportProps> = (props: ReportProps) => {
  const classes = useStyles();
  const [showChart, setChart] = React.useState(false);
  var [Budget, setBudget] = React.useState(0);
  var [timeWorked, settimeWorked] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [dataset, setData] = React.useState<number[]>([]);

  // var [timeWorked, setTimeWorked] = React.useState(0);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setChart(false);
    console.log(e.target.value);
    Budget = 0;
    timeWorked = 0;
    props.timeSheet.map((prop, key) => {
      if (prop.project.name === e.target.value) {
        Budget = prop.project.budget;
        timeWorked += prop.timeWorked;
        labels.push(prop.date);
        dataset.push(prop.timeWorked);
        setLabels(labels);
        setData(dataset);
        setBudget(Budget - timeWorked / 60);
        settimeWorked(timeWorked / 60);
      }
    });
    console.log(Budget);
    console.log(timeWorked);
    console.log(labels);
    console.log(dataset);
    if (timeWorked !== 0 && Budget !== 0) {
      setChart(true);
    } else {
      setOpen(true);
    }
  };
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple"></InputLabel>
        <Select
          native
          // value={state.age}
          onChange={e => {
            handleChange(e);
          }}
          inputProps={{
            name: "Projects",
            id: "age-native-simple"
          }}
        >
          <option value=""></option>
          {props.project.map((prop, key) => {
            return <option value={prop.name}>{prop.name}</option>;
          })}
        </Select>
      </FormControl>
      {showChart ? (
        <div className={classes.pie}>
          <Chart
            labels={["BudgetLeft", "Consumed"]}
            chartData={[Budget, timeWorked]}
            color={["#D23456", "#f2f2f2"]}
            title={"Budget"}
          />
        </div>
      ) : (
        <Modal open={open} onClose={e => handleClose()}>
          <div style={modalStyle} className={props.classes.paper1}>
            There is no Data in TimeSheet related to this Project
          </div>
        </Modal>
      )}
      {showChart ? (
        <div className={classes.chart}>
          <BarChart labels={labels} dataset={dataset}></BarChart>
        </div>
      ) : null}
    </div>
  );
};
export default ReportComponent;
