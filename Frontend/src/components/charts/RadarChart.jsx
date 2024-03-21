import React from "react";
import Chart from "chart.js/auto";

function RadarChart({ data, title = "Radar Chart", color = "#2222cc33" }) {
  const ctxRef = React.useRef(null);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: "radar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: title,
            data: Object.keys(data).map((key) => data[key]),
            backgroundColor: color,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: { pointLabels: { display: true }, ticks: { display: false } },
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [title, data, color]);

  return (
    <div id="radarContainer" className="w-56 md:w-1/3  mt-2 md:mt-10">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default RadarChart;
