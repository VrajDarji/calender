import { CalendarRange } from "lucide-react";
import React, { useState } from "react";
import { months } from "../data/data";

const Nav = ({
  currentMonth,
  selectedMonth,
}: {
  currentMonth: string;
  selectedMonth: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [dialog, setDialog] = useState(false);
  return (
    <>
      <p className="flex flex-row gap-1 text-xl justify-center items-center font-semibold">
        <CalendarRange />
        Calender
      </p>
      <p className="font-semibold text-2xl">{currentMonth} , 2023</p>
      <div className="relative">
        <button
          className="px-3 py-1 border-2 rounded-md text-lg font-normal"
          onClick={() => setDialog((prev) => !prev)}
        >
          Select Month
        </button>
        <div className="absolute z-20 top-[3rem] right-0">
          {dialog && (
            <div className="h-[30vh] w-[9vw] bg-white rounded-md py-3 px-1 flex flex-col gap-1 overflow-scroll shadow-md">
              {months.map((month) => (
                <p
                  className="cursor-pointer py-1 px-3 hover:bg-slate-100/70 rounded-sm"
                  onClick={() => {
                    selectedMonth(month.tag);
                    setDialog(false);
                  }}
                >
                  {month.tag}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
