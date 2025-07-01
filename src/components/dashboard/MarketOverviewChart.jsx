import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function MarketOverviewChart() {
  const [timeFrame, setTimeFrame] = useState("All");

  const chartData = {
    labels: ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM"],
    datasets: [
      {
        label: "Market Overview",
        data: [300, 500, 400, 600, 450, 700, 550, 400],
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgba(34, 197, 94, 1)",
        tension: 0.4,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(34, 197, 94, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { display: false } },
      y: { grid: { display: false }, ticks: { display: false }, beginAtZero: true },
    },
  };

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between lg:flex-row md:flex-row flex-col items-center lg:mb-4 md:mb-4 mb-10  gap-6">
        <h3 className="text-lg font-semibold text-gray-800 ">Market Overview</h3>
        <div className="flex gap-2">
          {["All", "1M", "6M", "1Y", "YTD"].map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeFrame === frame
                  ? "bg-[#124734] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}