import { BarChart } from "../lib";

const sampleData = [
  { label: "Jan", value: 65, color: "#ec4899" },
  { label: "Feb", value: 45, color: "#8b5cf6" },
  { label: "Mar", value: 85, color: "#3b82f6" },
  { label: "Apr", value: 55, color: "#10b981" },
  { label: "May", value: 75, color: "#f59e0b" },
  { label: "Jun", value: 95, color: "#ef4444" },
];

function BarChartExample() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f9fafb",
        padding: 20,
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
          maxWidth: 800,
        }}
      >
        <BarChart
          data={sampleData}
          barWidth={40}
          chartPadding={40}
          height={300}
        />
      </div>
    </div>
  );
}

export default BarChartExample;
