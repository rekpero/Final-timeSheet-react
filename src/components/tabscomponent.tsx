import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import routes from "../routes/dashboardrouters";
import history from "../services/history";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import managementRoutes from "../routes/managementRoutes";

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

const VerticalTabs: React.FC<{}> = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log(open);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              }}
            >
              {prop.name}
            </MenuItem>
          ))}
        </Menu>
      </Tabs>
    </div>
  );
};

export default VerticalTabs;
