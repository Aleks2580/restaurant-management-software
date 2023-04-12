import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Products() {
  const [topMenuSections, setTopMenuSections] = useState([]);
  const [topMenuCategories, setTopMenuCategories] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  const chartRef = useRef(null);

  useEffect(() => {
    (async function fetchData() {
      const response = await fetch(
        `http://localhost:4000/statistics_products`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      setBestSellingProducts(result.finalData);
    })();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bestSellingProducts?.map((product) => product.name),
        datasets: [
          {
            label: "Quantity Sold",
            data: bestSellingProducts?.map((product) => product.quantity),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Revenue $",
            data: bestSellingProducts?.map((product) => product.total),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    chartRef.current = chart;
  }, [bestSellingProducts]);

  return <canvas id="myChart" width="800" height="500"></canvas>;
}
