import React from "react";
import { Grid, Typography, makeStyles, Box, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import FolderIcon from "@material-ui/icons/Folder";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TableRow from "@material-ui/core/TableRow";
import { Card, CardContent, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { IProjectTimeSheet } from "../model/timesheet";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import TableBody from "@material-ui/core/TableBody";
import history from "../services/history";
import BarChart from "./bar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 10,
    backgroundColor: lighten("#ff6c5c", 0.5),
    borderRadius: 20
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  card: {
    width: "100%",
    "&:hover": {
      background: "#d3d3d3"
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  bold: {
    fontWeight: 550,
    color: "#696969"
  },
  out: {
    fontSize: 16
  },
  number: {
    fontWeight: 550
  }
}));

interface RouteParams {
  id: string;
}

interface ProjectDetailsProps extends RouteComponentProps<RouteParams> {
  timesheets: IProjectTimeSheet[];
  projects: IProjectInfo[];
  projectId: number;
  changeProjectState: (id: number, state: number) => void;
  openReports: () => void;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = (
  props: ProjectDetailsProps
) => {
  const classes = useStyles();

  const [currProject, setCurrProject] = React.useState<
    IProjectInfo | undefined
  >();
  const [totalTimer, setTotalTimer] = React.useState(0);
  const [phases, setPhases] = React.useState();
  const [labels, setLabels] = React.useState<string[]>([]);
  const [data, setData] = React.useState<number[]>([]);
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
  React.useEffect(() => {
    console.log(props.projects);
    if (props.projects.length !== 0 && props.timesheets.length !== 0) {
      const currProject = props.projects.filter(proj => {
        return proj.id === props.projectId;
      })[0];
      let labels_n: string[] = [];
      let dataset_n: number[] = [];
      props.timesheets.map((prop, key) => {
        if (prop.project.name === currProject.name) {
          labels_n.push(prop.date);
          dataset_n.push(prop.timeWorked);
        }
      });

      const projectTimesheets = props.timesheets.filter(
        (time: IProjectTimeSheet) => time.project.id === currProject.id
      );
      // console.log(Number.parseInt(props.match.params.id));
      const timer =
        projectTimesheets.length === 0
          ? 0
          : projectTimesheets
              .map((time: IProjectTimeSheet) => time.timeWorked)
              .reduce((prev: number, curr: number) => prev + curr);
      const phases = currProject.phases.map((phase: IPhasesInfo) => ({
        name: phase.name,
        totalTime:
          projectTimesheets.length === 0
            ? 0
            : projectTimesheets.filter(
                (time: IProjectTimeSheet) => time.phase === phase.name
              ).length === 0
            ? 0
            : projectTimesheets
                .filter((time: IProjectTimeSheet) => time.phase === phase.name)
                .map((time: IProjectTimeSheet) => time.timeWorked)
                .reduce((prev, curr) => prev + curr)
      }));
      setCurrProject(currProject);
      setTotalTimer(timer);
      setPhases(phases);
      setLabels(labels_n);
      setData(dataset_n);
      console.log(timer, currProject.budget, getTimeFromMins(timer));
    }
  }, [props]);

  return (
    <Box mx={12} my={6}>
      <Grid container>
        <Grid container className={classes.marginBottom}>
          <Grid
            item
            xs={8}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h4" component="h5">
                {currProject !== undefined ? currProject.name : ""}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="column-reverse"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Box>
              <Button
                size="large"
                variant="contained"
                color="default"
                onClick={e => {
                  history.push(`/dash/reports`);
                  props.openReports();
                }}
                style={{ width: "100%", marginBottom: 12 }}
                startIcon={<FolderIcon />}
              >
                Project Report
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={(e: any) => {
                  history.push(`/dash/projects/edit/${props.projectId}`);
                  props.changeProjectState(props.projectId, 2);
                }}
                style={{ width: "100%" }}
                startIcon={<EditIcon />}
              >
                Edit Project
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h5" component="h5">
                Budget
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end">
              <Typography variant="h6" component="h5">
                <span className={classes.number}>
                  {getTimeFromMins(totalTimer)}
                </span>{" "}
                <span className={classes.out}>out of</span>{" "}
                <span className={classes.number}>
                  {getTimeFromMins(
                    currProject !== undefined ? currProject.budget * 60 : 0
                  )}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.marginBottom}>
          <Box width="100%" mt={1}>
            <LinearProgress
              className={classes.root}
              variant="determinate"
              color="secondary"
              value={
                currProject !== undefined
                  ? (totalTimer * 100) / (currProject.budget * 60) > 100
                    ? 100
                    : (totalTimer * 100) / (currProject.budget * 60)
                  : 0
              }
            />
          </Box>
        </Grid>

        <Grid container spacing={2} className={classes.marginBottom}>
          <Grid item xs={8}>
            <Card className={classes.card} style={{ height: "100%" }}>
              <CardContent>
                <BarChart labels={labels} dataset={data}></BarChart>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Grid container>
                        <strong>Total Time</strong>
                      </Grid>
                      <Grid container justify="center">
                        <Typography
                          variant="h4"
                          component="h5"
                          className={classes.bold}
                        >
                          {getTimeFromMins(totalTimer)}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Grid container>
                        <strong>Billable Time</strong>
                      </Grid>
                      <Grid container justify="center">
                        <Typography
                          variant="h4"
                          component="h5"
                          className={classes.bold}
                        >
                          {getTimeFromMins(totalTimer)}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Grid container>
                        <strong>Budget Time</strong>
                      </Grid>
                      <Grid container justify="center">
                        <Typography
                          variant="h4"
                          component="h5"
                          className={classes.bold}
                        >
                          {getTimeFromMins(
                            currProject !== undefined
                              ? currProject.budget * 60
                              : 0
                          )}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Paper>
              <Grid container direction="row">
                <Grid container item xs={6} alignItems="center">
                  <Box mt={1} mx={3}>
                    <Typography variant="h6" component="h2">
                      Phases
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h4>Name</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Budget</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Total Time</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {phases !== undefined
                      ? phases.map((phase: any) => (
                          <TableRow hover>
                            <TableCell>{phase.name}</TableCell>
                            <TableCell>
                              {Math.floor(
                                currProject !== undefined
                                  ? (phase.totalTime * 100) /
                                      (currProject.budget * 60)
                                  : 0
                              )}
                              %
                            </TableCell>
                            <TableCell>
                              {getTimeFromMins(phase.totalTime)}
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>
              <Grid container direction="row">
                <Grid container item xs={6} alignItems="center">
                  <Box mt={1} mx={3}>
                    <Typography variant="h6" component="h2">
                      Members
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h4>Name</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Budget</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Total Time</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>
                        {currProject !== undefined
                          ? currProject.members.name
                          : ""}
                      </TableCell>
                      <TableCell>
                        {Math.floor(
                          currProject !== undefined
                            ? (totalTimer * 100) / (currProject.budget * 60)
                            : 0
                        )}
                        %
                      </TableCell>
                      <TableCell>{getTimeFromMins(totalTimer)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withRouter(ProjectDetailsComponent);
