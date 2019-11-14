import React, { Component } from "react";
import clamp from "lodash/clamp";
import { DraggableCore } from "react-draggable";
import settings from "./utils/settings";
import getIncrementDifference from "./utils/getIncrementDifference";

interface IDraggableLayer {
  scaled: boolean;
  schedule: any;
  schedules: any;
  times: any;
  source: any;
  time: any;
  validate: (a: any) => boolean;
  onDrag: (daya: any, index: any, updated: any, dayb: any) => void;
}

export default class DraggableLayer extends React.Component<IDraggableLayer> {
  state = {
    x: 0,
    y: 0,
    dragging: 0
  };

  render() {
    const { scaled } = this.props;
    const height = scaled ? settings.scaled : settings.height;
    const width = scaled ? settings.scaled : settings.width;

    return (
      <DraggableCore
        allowAnyClick
        grid={[width, height]}
        cancel=".draggable-cancel"
        onStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onStop={this.handleDragStop}
      >
        {this.props.children}
      </DraggableCore>
    );
  }

  // day, index
  handleDragStart = (evt: any, position: any) => {
    const { schedule, schedules, times, source } = this.props;
    const time = times.findIndex((time: any) =>
      time.start.isSame(schedule.start)
    );
    const day = Object.keys(schedules).indexOf(source.day);

    const { scaled } = this.props;
    const height = scaled ? settings.scaled : settings.height;
    const width = scaled ? settings.scaled : settings.width;

    this.setState({
      x: width * day,
      y: height * time
    });
  };

  handleDrag = (evt: any, position: any) => {
    this.setState({
      x: this.state.x + position.deltaX,
      y: this.state.y + position.deltaY,
      dragging: true
    });
  };

  handleDragStop = (evt: any) => {
    if (!this.state.dragging) {
      return;
    }

    const { scaled } = this.props;
    const height = scaled ? settings.scaled : settings.height;
    const width = scaled ? settings.scaled : settings.width;

    const { x, y } = this.state;
    const { source, schedule, schedules, times } = this.props;
    const keys = Object.keys(schedules);
    const day = keys[clamp(Math.ceil(x / width), 0, keys.length - 1)]; // Target day (index)
    const time = times[clamp(Math.ceil(y / height), 0, times.length - 1)]; // Target time (index)

    
    let start = schedule.start;
    let end = schedule.end;
    // If we dragged to another time (vertical),
    // we'll compute those changes for validation.
    if (!time.start.isSame(schedule.start)) {
      const { increment } = this.props.time;
      const difference = getIncrementDifference(start, end, increment);
      start = time.start.clone();
      const hours = difference * increment.hours;
      const minutes = difference * increment.minutes;
      end = time.start
        .clone()
        .add(hours, "hours")
        .add(minutes, "minutes");
    }

    // We'll apply changes only once we've verified that thing are valid
    if (this.props.validate({ day, schedule, start, end })) {
      const updated = {
        ...schedule,
        start,
        end
      };
      console.log(schedules[day], updated)
      schedules[day] = schedules[day].map((_: any, i: number) => {
        return i === source.index ? updated : _;
      })
      console.log(schedules[day], day)
      // schedules[day] = updated

      // Just noting that we're no longer resetting state (setting the
      // dragging flag to false) after this because the component is being
      // re-rendered on another column after [dragging] calling this callback
      this.props.onDrag(source.day, source.index, schedules, day);
    }
  };
}
