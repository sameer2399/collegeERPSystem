export const pieChartOptions = {
  labels: ["Attended", "Absent"],
  colors: ["#32F83A", "#F9673A"],
  chart: {
    width: "100px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#32F83A", "#F9673A"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};
