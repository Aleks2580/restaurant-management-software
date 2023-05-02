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
      const response = await fetch(`/statistics_products`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Products",
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
      type: "line",
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Menu sections",
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Menu categories",
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
      <div className={style.chart_container}>
        <canvas id="myChart"></canvas>
      </div>
      <div className={style.chart_container}>
        <canvas id="myChart2"></canvas>
      </div>
      <div className={style.chart_container}>
        <canvas id="myChart3"></canvas>
      </div>
    </div>
  );
}
