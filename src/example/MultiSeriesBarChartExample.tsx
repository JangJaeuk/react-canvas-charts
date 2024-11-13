import { MultiSeriesBarChart } from "../lib";

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  series: [
    {
      name: "기업 A",
      color: "#3b82f6",
      data: [185, 105, 90, 80, 40],
    },
    {
      name: "기업 B",
      color: "#ef4444",
      data: [145, 122, 148, 68, 18],
    },
  ],
};

function MultiSeriesBarChartExample() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f9fafb",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Interactive Bar Chart
        </h1>
        <div
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 16,
            marginTop: 20,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <MultiSeriesBarChart
            labels={chartData.labels}
            series={chartData.series}
            barWidth={40}
            chartPadding={40}
            height={300}
            tooltipTheme={"dark"}
            barSpacing={10}
          />
        </div>
      </div>
    </div>
  );
}

export default MultiSeriesBarChartExample;
