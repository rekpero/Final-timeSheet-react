import React, { useEffect } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
import ProjectComponent from "./projectcomponent1";
import TimesheetComponent from "./timesheetcomponent";
import { IProjectInfo } from "../model/project";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import EditProjectComponent from "./editprojectcomponent";

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
interface IVerticalTabs extends RouteComponentProps {
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
  project: IProjectInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
}

const VerticalTabs: React.FC<IVerticalTabs> = (props: IVerticalTabs) => {
  const classes = useStyles();
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

  useEffect(() => {
    var path = props.location.pathname;

    const routesList = routes.map(route => route.layout + route.path);
    console.log(path, routesList.indexOf(path));
    // console.log(path, routesList.indexOf(path));
    setValue(routesList.indexOf(path));
    setUrlPath(path);
    // console.log(urlPath);
  }, [props.location.pathname]);

  console.log(props.project);
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
              }}
            >
              {prop.name}
            </MenuItem>
          ))}
        </Menu>
      </Tabs>
      <Route
        path={`${props.match.path}/projects/edit/:id`}
        exact
        render={() => {
          console.log(props.project);
          return (
            <EditProjectComponent
              projects={props.project}
              clients={props.clients}
              timeSheets={props.timeSheet}
            />
          );
        }}
      />
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
        {managementValue === 3 ? <WorkspaceSettingComponent /> : null}
      </TabPanel> */}
    </div>
  );
};

export default VerticalTabs;
