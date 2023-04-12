import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import style from "./Products.module.css";

export default function Products() {
  const [topMenuSections, setTopMenuSections] = useState([]);
  const [topMenuCategories, setTopMenuCategories] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);

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
      setTopMenuCategories(result.categoryTotals);
      setTopMenuSections(result.sectionTotals);
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

    if (chartRef2.current) {
      chartRef2.current.destroy();
    }
    const ctx2 = document.getElementById("myChart2").getContext("2d");
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
    const chart2 = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: topMenuSections?.map((section) => section.name),
        datasets: [
          {
            label: "Quantity Sold",
            data: topMenuSections?.map((section) => section.quantity),
            backgroundColor: colors,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Revenue $",
            data: topMenuSections?.map((section) => section.total),
            backgroundColor: colors.map((color) => `${color}33`),
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

    if (chartRef3.current) {
      chartRef3.current.destroy();
    }
    const ctx3 = document.getElementById("myChart3").getContext("2d");
    const chart3 = new Chart(ctx3, {
      type: "line",
      data: {
        labels: topMenuCategories?.map((category) => category.name),
        datasets: [
          {
            label: "Quantity Sold",
            data: topMenuCategories?.map((category) => category.quantity),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Revenue $",
            data: topMenuCategories?.map((category) => category.total),
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
    chartRef2.current = chart2;
    chartRef3.current = chart3;
  }, [bestSellingProducts, topMenuCategories, topMenuSections]);

  return (
    <div className={style.charts}>
      <div className={style["chart-container"]}>
        <canvas id="myChart" width="400" height="430"></canvas>
      </div>
      <div className={style["chart-container"]}>
        <canvas id="myChart2" width="400" height="300"></canvas>
      </div>
      <div className={style["chart-container"]}>
        <canvas id="myChart3" width="400" height="430"></canvas>
      </div>
    </div>
  );
}
