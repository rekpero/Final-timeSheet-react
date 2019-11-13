import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StatusOverview from "./statusoverviewcomponent";
import StatusProject from "./statusprojectcomponent";
import StatusMembers from "./statusmemberscomponent";
import StatusClients from "./statusclientscomponent";
import StatusPhases from "./statusphasescomponent";

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
    marginTop: "7%"
  }
}));

const StatusComponent: React.FC<{}> = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Projects" {...a11yProps(1)} />
          <Tab label="Members" {...a11yProps(2)} />
          <Tab label="Client" {...a11yProps(3)} />
          <Tab label="Phase Categories" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <div className={classes.tablePanel}>
        <TabPanel value={value} index={0}>
          {StatusOverview}
        </TabPanel>
      </div>
      <TabPanel value={value} index={1}>
        {StatusProject}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {StatusMembers}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {StatusClients}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {StatusPhases}
      </TabPanel>
    </div>
  );
};
export default StatusComponent;
