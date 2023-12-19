import { CalendarRange } from "lucide-react";
import React from "react";

const Nav = ({ currentMonth }: { currentMonth: string }) => {
  return (
    <>
      <p className="flex flex-row gap-1 text-xl justify-center items-center font-semibold">
        <CalendarRange />
        Calender
      </p>
      <p className="font-semibold text-2xl">{currentMonth} , 2023</p>
      <p>Costwise</p>
    </>
  );
};

export default Nav;
