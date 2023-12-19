import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { months } from "../data/data";
import App from "../App";

const MainLayout = () => {
  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState<string>(
    months[date.getMonth()].tag
  );
  const [selectedMonth, setSelectedMonth] = useState("");
  return (
    <div className="w-full h-screen fixed flex flex-col">
      <div className="w-full h-[10vh] border-b-2 px-5 flex flex-row items-center bg-slate-100/70 justify-between">
        <Nav currentMonth={currentMonth} selectedMonth={setSelectedMonth} />
      </div>
      <div className="flex relative flex-row w-full h-[90vh]">
        <div className="hidden absolute md:flex top-0 left-0 h-full w-[20vw] border-r p-4">
          <Sidebar />
        </div>
        <div
          className="
          relative md:absolute w-[100vw] right-0 h-[90vh] md:w-[80vw]"
        >
          <App
            setCurrentMonth={setCurrentMonth}
            selectedMonth={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
