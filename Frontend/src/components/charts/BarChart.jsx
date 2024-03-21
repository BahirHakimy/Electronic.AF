import React from "react";
import Chart from "chart.js/auto";

function BarChart({ data, color = "", title = "Bar Chart" }) {
  const ctxRef = React.useRef(null);

  const createColors = React.useCallback(() => {
    function randomNum() {
      return Number.parseInt(Math.random() * 256);
    }
    return Object.keys(data).map(() =>
      color === ""
        ? `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`
        : color
    );
  }, [color, data]);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: title,
            data: Object.keys(data).map((key) => data[key]),
            backgroundColor: createColors(),
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false } },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [createColors, title, data]);

  return (
    <div id="barContainer" className="w-64 md:w-1/2  mt-2 md:mt-5">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default BarChart;
