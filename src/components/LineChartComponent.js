import React, { useEffect, useRef, useState } from "react";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { CryptoState } from "../CryptoContext";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
const LineChartComponent = ({ data, days }) => {
  const [myChart, setMyChar] = useState();
  const ref = useRef(null);
  let ctx;
  console.log(myChart, "si hay");

  const { currency } = CryptoState();

  useEffect(() => {
    ctx = ref.current.getContext("2d");
    console.log(currency);
    console.log(myChart);
    if (myChart) {
      myChart.destroy();
      console.log("entre");
    }
    try {
      if (!myChart) {
        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: data.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          },
          options: {
            elements: {
              point: {
                radius: 1,
              },
            },
          },
        });
        setMyChar(newChart);
      }
      console.log(myChart);
    } catch (error) {
      console.log(error);
      console.log(myChart);
    }
  }, [currency]);
  return (
    <div>
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default LineChartComponent;
