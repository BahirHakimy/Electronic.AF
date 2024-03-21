import React from "react";
import Chart from "chart.js/auto";

function PieChart({ data, title = "Pie Chart" }) {
  const ctxRef = React.useRef(null);

  const createColors = React.useCallback(() => {
    function randomNum() {
      return Number.parseInt(Math.random() * 256);
    }
    return Object.keys(data).map(
      () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.6)`
    );
  }, [data]);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.keys(data).map((key) => data[key]),
            backgroundColor: createColors(),
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: {
          legend: {
            title: { display: true, text: title },
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [createColors, title, data]);

  return (
    <div id="pieContainer" className="w-52 md:w-1/3 mx-auto mt-2 md:mt-5 ">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default PieChart;
