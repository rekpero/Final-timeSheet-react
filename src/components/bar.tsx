import React from "react";
import { Bar } from "react-chartjs-2";
import { Container, Grid } from "@material-ui/core";
import classes from "*.module.sass";
// import { data } from "chart.js";
interface IBarProps {
  labels: string[];
  dataset: number[];
}
const BarChart: React.FC<IBarProps> = (props: IBarProps) => {
  const displayName = "BarExample";

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Time in min",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.dataset
      }
    ]
  };

  return (
    <div>
      <Grid>
        <h2>Project Data</h2>
        <Bar
          data={data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
      </Grid>
    </div>
  );
};
export default BarChart;
