import React from "react";
import Chart from "chart.js/auto";

function DoughnutChart({ data1, data2, title = "Radar Chart" }) {
  const ctxRef = React.useRef(null);

  const createColors = React.useCallback(() => {
    function randomNum() {
      return Number.parseInt(Math.random() * 256);
    }
    return Object.keys(data2).map(
      () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.6)`
    );
  }, [data2]);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: "doughnut",
      data: {
        labels: [...Object.keys(data2), ...Object.keys(data1)],
        datasets: [
          {
            data: Object.keys(data2).map((key) => data2[key]),
            backgroundColor: createColors(),
            label: "Sales per brand",
          },
          {
            data: Object.keys(data1).map((key) => data1[key]),
            backgroundColor: "#3434ff77",
            label: "Total sold PCs",
          },
        ],
      },
      options: {
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: {
          legend: {
            title: { text: "Product sales per Brand", display: true },
            labels: {
              generateLabels: ({ data: { datasets, labels } }) => {
                const upperRing = datasets[0].data.map((data, i) => ({
                  text: labels[i],
                  fillStyle: datasets[0].backgroundColor[i],
                  strokeStyle: datasets[0].backgroundColor[i],
                }));
                return [
                  ...upperRing,
                  {
                    text: labels[labels.length - 1],
                    fillStyle: datasets[1].backgroundColor,
                  },
                ];
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${
                  context.datasetIndex === 0 ? context.label : "Total"
                }: ${context.parsed}`;
              },
            },
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [createColors, title, data1, data2]);

  return (
    <div id="radarContainer" className="w-56 md:w-1/3  mt-2 md:mt-10 ">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default DoughnutChart;
