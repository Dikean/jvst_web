import React from "react";
import CardBarChart from "./CardBarChart";
import CardLineChart from "./CardLineChart";

export default function ChartDashboard() {

  return (
    <>
     <div className="flex flex-wrap ">
        <div className="w-full lg:w-8/12 px-4">
          <CardBarChart />
        </div>
        <div className="w-full lg:w-4/12 px-4 ">
         <CardBarChart />
        </div>
      </div>
    </>
  );
}