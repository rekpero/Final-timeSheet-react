import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid, Button } from "@material-ui/core";
import PhaseProjectComponent from "./phaseprojectcomponent";
import InfoProjectComponent from "./infoprojectcomponent";
import MemberProjectComponent from "./memberprojectcomponent";
import { IProjectInfo } from "../model/project";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={5}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  tablePanel: {
    marginLeft: "7%",
    marginTop: "1%"
  },
  button: {
    backgroundColor: "#32943d",
    color: "white",
    marginTop: "7px",
    marginBottom: "7px",
    paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "darkgreen"
    }
  }
}));
interface RouteParams {
  id: string;
}

interface IEditProjectComponent extends RouteComponentProps<RouteParams> {
  projects: IProjectInfo[];
  clients: IClientInfo[];
  timeSheets: IProjectTimeSheet[];
}

const EditProjectComponent: React.FC<IEditProjectComponent> = (
  props: IEditProjectComponent
) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState();
  const [client, setClient] = React.useState();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(props.projects);
    const project = props.projects.filter(proj => {
      return proj.id === Number.parseInt(props.match.params.id);
    })[0];
    const client = props.clients.filter(cl => cl.id === project.clientId)[0];
    // console.log(Number.parseInt(props.match.params.id));
    setProject(project);
    setClient(client);
    console.log(project, client);
  }, [props]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Phases" {...a11yProps(1)} />
          <Tab label="Members" {...a11yProps(2)} />
          <Grid item xs={7}></Grid>
          <Button variant="contained" size="large" className={classes.button}>
            Save
          </Button>
        </Tabs>
      </AppBar>
      <div className={classes.tablePanel}>
        <TabPanel value={value} index={0}>
          <InfoProjectComponent project={project} client={client} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PhaseProjectComponent
            phases={project !== undefined ? project.phases : []}
            timeSheets={props.timeSheets}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MemberProjectComponent />
        </TabPanel>
      </div>
    </div>
  );
};
export default withRouter(EditProjectComponent);
