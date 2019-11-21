import React, { useState, useEffect } from "react";
import moment from "moment";
import Timesheet from "./timesheetcomponents/jsx/timesheet";
import "./timesheetcomponents/styles/normalize.css";
import "./timesheetcomponents/styles/rc-tooltip.css";
import "./timesheetcomponents/styles/react-select.css";
import "./timesheetcomponents/styles/style.css";
import "./timesheetcomponents/styles/vendor.css";
import {
  Grid,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Paper
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import projectService from "../services/projectService";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Chart from "./dougnutChart";

export default function DashboardComponent(props) {
  const [schedules, setSchedules] = useState({
    ["Mon " + (moment().date() - moment().day() + 1)]: [],
    ["Tue " + (moment().date() - moment().day() + 2)]: [],
    ["Wed " + (moment().date() - moment().day() + 3)]: [],
    ["Thurs " + (moment().date() - moment().day() + 4)]: [],
    ["Fri " + (moment().date() - moment().day() + 5)]: [],
    ["Sat " + (moment().date() - moment().day() + 6)]: [],
    ["Sun " + (moment().date() - moment().day() + 7)]: []
  });

  useEffect(() => {
    const timesheets = props.timeSheet;
    const monday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 1, "days"),
        "day"
      );
    });
    const tuesday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 2, "days"),
        "day"
      );
    });
    const wednesday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 3, "days"),
        "day"
      );
    });
    const thursday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 4, "days"),
        "day"
      );
    });
    const friday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 5, "days"),
        "day"
      );
    });
    const saturday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 6, "days"),
        "day"
      );
    });
    const sunday = timesheets.filter(time => {
      return moment(time.date, "YYYY-MM-DD").isSame(
        moment().subtract(moment().day() - 7, "days"),
        "day"
      );
    });
    setSchedules({
      ["Mon " + (moment().date() - moment().day() + 1)]:
        monday.length === 0
          ? []
          : monday.map((time, index) => {
              // console.log(
              //   moment("10:00 am", "hh:mm a")
              //     .add(
              //       monday.filter((val, i) => i < index).length === 0
              //         ? 0
              //         : monday
              //             .filter((val, i) => i < index)
              //             .map(time => time.timeWorked)
              //             .reduce(
              //               (prev, curr) => prev + curr
              //             ),
              //       "m"
              //     )
              //     .toString()
              // );
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  monday.filter((val, i) => i < index).length === 0
                    ? 0
                    : monday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    monday.filter((val, i) => i < index).length === 0
                      ? 0
                      : monday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Tue " + (moment().date() - moment().day() + 2)]:
        tuesday.length === 0
          ? []
          : tuesday.map((time, index) => {
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  tuesday.filter((val, i) => i < index).length === 0
                    ? 0
                    : tuesday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    tuesday.filter((val, i) => i < index).length === 0
                      ? 0
                      : tuesday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Wed " + (moment().date() - moment().day() + 3)]:
        wednesday.length === 0
          ? []
          : wednesday.map((time, index) => {
              // console.log(
              //   wednesday.filter((val, i) => i < index).length === 0
              //     ? 0
              //     : wednesday
              //         .filter((val, i) => i < index)
              //         .map(time => time.timeWorked)
              //         .reduce((prev, curr) => prev + curr)
              // );
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  wednesday.filter((val, i) => i < index).length === 0
                    ? 0
                    : wednesday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    wednesday.filter((val, i) => i < index).length === 0
                      ? 0
                      : wednesday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Thurs " + (moment().date() - moment().day() + 4)]:
        thursday.length === 0
          ? []
          : thursday.map((time, index) => {
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  thursday.filter((val, i) => i < index).length === 0
                    ? 0
                    : thursday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    thursday.filter((val, i) => i < index).length === 0
                      ? 0
                      : thursday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Fri " + (moment().date() - moment().day() + 5)]:
        friday.length === 0
          ? []
          : friday.map((time, index) => {
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  friday.filter((val, i) => i < index).length === 0
                    ? 0
                    : friday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    friday.filter((val, i) => i < index).length === 0
                      ? 0
                      : friday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Sat " + (moment().date() - moment().day() + 6)]:
        saturday.length === 0
          ? []
          : saturday.map((time, index) => {
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  saturday.filter((val, i) => i < index).length === 0
                    ? 0
                    : saturday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    saturday.filter((val, i) => i < index).length === 0
                      ? 0
                      : saturday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            }),
      ["Sun " + (moment().date() - moment().day() + 7)]:
        sunday.length === 0
          ? []
          : sunday.map((time, index) => {
              return {
                start: moment("10:00 am", "hh:mm a").add(
                  sunday.filter((val, i) => i < index).length === 0
                    ? 0
                    : sunday
                        .filter((val, i) => i < index)
                        .map(time => time.timeWorked)
                        .reduce((prev, curr) => prev + curr),
                  "m"
                ),
                end: moment("10:00 am", "hh:mm a")
                  .add(
                    sunday.filter((val, i) => i < index).length === 0
                      ? 0
                      : sunday
                          .filter((val, i) => i < index)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr),
                    "m"
                  )
                  .add(time.timeWorked, "m"),
                data: {
                  phase: { name: time.phase },
                  project: time.project,
                  note: { name: time.note },
                  timesheetId: time.id
                }
              };
            })
    });
  }, [props.timeSheet]);

  const setTimer = (day, index) => {
    const hours = Number.parseInt(
      moment
        .utc(schedules[day][index].end.diff(schedules[day][index].start))
        .format("HH")
    );
    const minutes = Number.parseInt(
      moment
        .utc(schedules[day][index].end.diff(schedules[day][index].start))
        .format("mm")
    );
    const timesheet = {
      id: schedules[day][index].data.timesheetId,
      project: schedules[day][index].data.project.name,
      phase: schedules[day][index].data.phase.name
    };
    console.log(hours, minutes, timesheet, true);
    props.setTimer(hours, minutes, timesheet, true);
  };

  const openEditTimer = (day, index) => {
    const schedule = schedules[day][index];
    console.log(
      schedule.data.project.name + "/" + schedule.data.project.id,
      schedule.data.phase.name,
      schedule.data.note.name,
      Number.parseInt(
        moment.utc(schedule.end.diff(schedule.start)).format("HH")
      ),
      Number.parseInt(
        moment.utc(schedule.end.diff(schedule.start)).format("mm")
      ),
      moment().format("YYYY") +
        "-" +
        moment().format("MM") +
        "-" +
        day.split(" ")[1]
    );
    props.editTimer(
      schedule.data.timesheetId,
      schedule.data.project.name + "/" + schedule.data.project.id,
      schedule.data.phase.name,
      schedule.data.note.name,
      Number.parseInt(
        moment.utc(schedule.end.diff(schedule.start)).format("HH")
      ),
      Number.parseInt(
        moment.utc(schedule.end.diff(schedule.start)).format("mm")
      ),
      moment().format("YYYY") +
        "-" +
        moment().format("MM") +
        "-" +
        day.split(" ")[1]
    );
  };

  const handleStore = (day, schedule) => {
    setSchedules({
      ...schedules,
      [day]: [...schedules[day], schedule]
    });
  };

  const handleUpdate = (day, index, schedule, dest = day) => {
    if (dest === day) {
      setSchedules({
        ...schedules,
        [day]: schedules[day].map((_, i) => {
          return i === index ? schedule : _;
        })
      });
      updateTimer(
        schedule.data.project,
        schedule.data.phase.name,
        Number.parseInt(
          moment.utc(schedule.end.diff(schedule.start)).format("HH")
        ),
        Number.parseInt(
          moment.utc(schedule.end.diff(schedule.start)).format("mm")
        ),
        moment().format("YYYY") +
          "-" +
          moment().format("MM") +
          "-" +
          day.split(" ")[1],
        schedule.data.note.name,
        schedule.data.timesheetId
      );
    } else {
      setSchedules({
        ...schedules,
        [day]: schedules[day].filter((_, i) => i !== index),
        [dest]: [...schedules[dest], schedule]
      });
      updateTimer(
        schedule.data.project,
        schedule.data.phase.name,
        Number.parseInt(
          moment.utc(schedule.end.diff(schedule.start)).format("HH")
        ),
        Number.parseInt(
          moment.utc(schedule.end.diff(schedule.start)).format("mm")
        ),
        moment().format("YYYY") +
          "-" +
          moment().format("MM") +
          "-" +
          dest.split(" ")[1],
        schedule.data.note.name,
        schedule.data.timesheetId
      );
    }
  };

  const updateTimer = (project, phase, hrs, min, date, note, timerId) => {
    projectService
      .updateTimesheetData(
        {
          project,
          phase,
          timeWorked:
            Number.parseInt(hrs + "") * 60 + Number.parseInt(min + ""),
          date: moment(new Date(date)).format("YYYY-MM-DD"),
          note
        },
        timerId
      )
      .subscribe(data => {
        console.log(data);
        props.timesheetData();
      });
  };

  const handleRequestAction = (day, index, action) => {
    if (action) {
      setSchedules({
        ...schedules,
        [day]: schedules[day].map((schedule, i) => {
          return i === index
            ? {
                ...schedule,
                request: false,
                requester: null
              }
            : schedule;
        })
      });
    } else {
      setSchedules({
        ...schedules,
        [day]: schedules[day].filter((schedule, i) => {
          return i !== index;
        })
      });
    }
  };

  const handleDelete = (day, index) => {
    projectService
      .deleteTimesheetData(schedules[day][index].data.timesheetId)
      .subscribe(data => {
        console.log(data);
        setSchedules({
          ...schedules,
          [day]: schedules[day].filter((schedule, i) => {
            return i !== index;
          })
        });
        props.timesheetData();
      });
  };

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(match);

  return (
    <Grid container direction="row" justify="center">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Grid container direction="row" justify="flex-start">
            <Box my={3} mx={5}>
              <Typography variant="h5">
                {moment().format("MMMM")} {moment().format("YYYY")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Box my={3} mx={5}>
              <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group"
              >
                <Button>
                  <ArrowBackIosIcon fontSize="medium"></ArrowBackIosIcon>
                </Button>
                <Button>Today</Button>
                <Button>
                  <ArrowForwardIosIcon fontSize="medium"></ArrowForwardIosIcon>
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={9}>
          <Grid container direction="row" justify="center">
            <Timesheet
              request={false}
              requester={{
                id: 1,
                department: {
                  name: "CSIT"
                },
                user: {
                  name: "Winner Gatchalian"
                }
              }}
              time={{
                start: "10:00 AM",
                end: "10:00 PM",
                increment: { hours: 1, minutes: 0 }
              }}
              sections={[
                {
                  value: 1,
                  label: "Hello"
                }
              ]}
              subjects={[
                {
                  value: 1,
                  label: "Hello"
                }
              ]}
              professors={[
                {
                  value: 1,
                  label: "Hello"
                }
              ]}
              scaled={match}
              schedules={schedules}
              onStore={handleStore}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              setTimer={setTimer}
              onRequestAction={handleRequestAction}
              editTimesheet={openEditTimer}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ padding: 12, marginLeft: 12, marginRight: 12 }}>
            <Chart
              labels={[" Total Time in hrs"]}
              chartData={[props.timeWorked]}
              color={["#D32322"]}
              title={"TimeWorked"}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
