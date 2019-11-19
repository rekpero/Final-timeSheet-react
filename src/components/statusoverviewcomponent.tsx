import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dp from "../assets/images/dp.png";
import Grid from "@material-ui/core/Grid";
import { IProjectInfo } from "../model/project";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 280
    },
    avatar: {
      margin: 10
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  })
);

interface IStatusOverviewComponent {
  projects: IProjectInfo[];
}
const StatusOverviewComponent: React.FC<IStatusOverviewComponent> = (
  props: IStatusOverviewComponent
) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Rohan Saini" />
      <CardMedia className={classes.media} image={dp} title="User" />

      <CardActions disableSpacing>
        Expand to see projects
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show projects"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.projects
            .map(project => ({
              name: project.name,
              time: project.budget
            }))
            .map((project, i) => (
              <Grid container spacing={2} key={i}>
                <Grid item xs={10}>
                  {project.name}
                </Grid>
                <Grid item xs={2}>
                  {project.time}
                </Grid>
              </Grid>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default StatusOverviewComponent;
