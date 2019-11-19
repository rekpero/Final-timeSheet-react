import React, { useEffect } from "react";
import { RouteComponentProps, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import routes from "../routes/dashboardrouters";
import history from "../services/history";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import managementRoutes from "../routes/managementRoutes";
import { Typography, Box } from "@material-ui/core";
import StatusComponent from "./statuscomponent";
import ActivityLogComponent from "./activitylogcomponent";
import WorkspaceSettingComponent from "./workspacesettingcomponent";
import ProjectComponent from "./projectcomponent";
import DashboardComponent from "../layout/dashboardcomponent";
import AddMember from "./addmemberclasscomponent";
import PhasesModal from "./managePhases";
import TimesheetComponent from "./timesheetcomponent";
import { IProjectInfo } from "../model/project";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import EditProjectComponent from "./editprojectcomponent";
import { IPhasesInfo } from "../model/phases";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 65,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  menu: {
    marginLeft: "100"
  }
}));

const useStylesModal = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    paper1: {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8),
      [theme.breakpoints.down("sm")]: {
        width: 200,
        height: 100
      }
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    formControl: {
      marginRight: theme.spacing(5),
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },

    button1: {
      fontSize: "small"
    }
  })
);

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      <Box>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
interface ITabsProps extends RouteComponentProps {
  children: any;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  setTimer: (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => void;
  editTimer: (
    timesheetId: number,
    project: string,
    phase: string,
    note: string,
    hour: number,
    minute: number,
    date: string
  ) => void;
}

const VerticalTabs: React.FC<ITabsProps> = (props: ITabsProps) => {
  const classes = useStyles();
  const classes1 = useStylesModal();
  const [value, setValue] = React.useState(0);
  const [managementValue, setManagementValue] = React.useState();
  const [urlPath, setUrlPath] = React.useState(props.location.pathname);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue !== 5) {
      setValue(newValue);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setOpen4(false);
  };
  const handleClose2 = () => {
    setOpen3(false);
  };
  useEffect(() => {
    var path = props.location.pathname;

    const routesList = routes.map(route => route.layout + route.path);
    console.log(path, routesList.indexOf(path));
    // console.log(path, routesList.indexOf(path));
    setValue(routesList.indexOf(path));
    setUrlPath(path);
    // console.log(urlPath);
  }, [props.location.pathname]);

  const [open4, setOpen4] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen = () => {
    setOpen4(true);
  };
  const handleOpen1 = () => {
    setOpen3(true);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {routes.map((prop, key) => {
          return (
            <Tab
              key={key}
              label={prop.name}
              onClick={event => {
                event.preventDefault();
                history.push(prop.layout + prop.path);
                // history.push(prop.layout + prop.path);
              }}
            ></Tab>
          );
        })}
        <Tab
          label="Management"
          onClick={event => {
            event.preventDefault();
            setManagementValue(null);
            handleClick(event);
          }}
        >
          {" "}
        </Tab>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
          //   selected={option === 'Pyxis'}
        >
          {managementRoutes.map((prop, key) => (
            <MenuItem
              key={prop.name}
              onClick={e => {
                handleClose();
                history.push(prop.layout + prop.path);
                setManagementValue(key);
                setValue(5);
                if (key === 1) {
                  handleOpen();
                }
                if (key === 2) {
                  handleOpen1();
                }
              }}
            >
              {prop.name}
            </MenuItem>
          ))}
        </Menu>
      </Tabs>
      <TabPanel>{props.children}</TabPanel>

      {/* <TabPanel value={value} index={0}>
        <Route
          path={`${props.match.path}/dashboard`}
          render={() => (
            <TimesheetComponent
              setTimer={props.setTimer}
              editTimer={props.editTimer}
            />
          )}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Route
          path={`${props.match.path}/projects`}
          exact
          render={() => (
            <ProjectComponent
              project={props.project}
              clients={props.clients}
              timeSheet={props.timeSheet}
            />
          )}
        />
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StatusComponent />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ActivityLogComponent />
      </TabPanel>
      <TabPanel value={value} index={5}>
        {managementValue === 1 ? (
          <AddMember
            clientsData={props.clientData}
            clientData={props.clients.map(client => ({
              clients: client,
              existence: true
            }))}
            open={open4}
            handleClose={handleClose1}
            classes={classes1}
          ></AddMember>
        ) : null}
        {managementValue === 2 ? (
          <PhasesModal
            phaseData={props.phases.map(phase => ({
              phases: phase,
              existence: true
            }))}
            open={open3}
            handleClose={handleClose2}
            classes={classes1}
          ></PhasesModal>
        ) : null}
        {managementValue === 3 ? <WorkspaceSettingComponent /> : null}
      </TabPanel> */}
    </div>
  );
};

export default withRouter(VerticalTabs);
