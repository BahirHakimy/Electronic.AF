import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiDollar, BiUserPin } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";

import { BarChart, PieChart, RadarChart, DoughnutChart } from "./charts";
import ReportCard from "./reportCard";
import Nav from "./adminNav";

function Dashboard() {
  const productSales = {
    Jan: 43,
    Feb: 120,
    Mar: 180,
    Apr: 45,
    May: 350,
    Jun: 500,
  };
  const perCategorySales = {
    Laptop: 620,
    Desktop: 340,
    Accessories: 250,
    Other: 120,
  };
  const overralRatings = {
    "1 x ✪": 340,
    "2 x ✪": 40,
    "3 x ✪": 235,
    "4 x ✪": 530,
    "5 x ✪": 744,
  };

  const totalSoldPCs = {
    Total: 960,
  };
  const salesPerBrand = {
    HP: 420,
    DELL: 300,
    LENOVO: 100,
    APPLE: 90,
    TOSHIBA: 50,
  };

  return (
    <div className="flex p-0 m-0 bg-cyan-600 h-screen overflow-hidden">
      <Nav />
      <div className="w-full h-full scrollbar-thumb:rounded bg-slate-50 rounded-xl mt-5 mr-5 px-10 py-5 max-h-screen overflow-scroll">
        <h1 className="text-slate-600 font-semibold">General Report</h1>
        <hr />
        <div className="flex flex-wrap p-2 md:p-5">
          <ReportCard
            title="Sales"
            subTitle="Total sales this month"
            value="$10900.00"
            Icon={BiDollar}
            color="green"
          />
          <ReportCard
            title="Orders"
            subTitle="Total orders this month"
            value="1099"
            Icon={AiOutlineShoppingCart}
            color="sky"
          />
          <ReportCard
            title="Customers"
            subTitle="Total Customers"
            value="3500"
            Icon={BiUserPin}
            color="violet"
          />

          <ReportCard
            title="Stock"
            subTitle="Products left in stock"
            value="400"
            Icon={FaBoxes}
            color="rose"
          />
        </div>
        <h1 className="text-slate-600 font-semibold">Statistics</h1>
        <hr />
        <div className="flex flex-wrap justify-evenly items-baseline p-2 md:p-5">
          <BarChart data={productSales} title="Sales per month" />
          <PieChart data={perCategorySales} title="Sales per category" />
          <RadarChart data={overralRatings} title="Overal Ratings" />
          <DoughnutChart
            data1={totalSoldPCs}
            data2={salesPerBrand}
            title="Sales per Brand"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
