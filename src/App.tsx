import React, { useEffect, useRef } from "react";
import { months, days } from "./data/data";
import { useModal } from "./hooks/useModal";

function App({
  setCurrentMonth,
  selectedMonth,
}: {
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedMonth: string;
}) {
  const date = new Date();
  const ref = useRef<HTMLDivElement | null>(null);
  const { onOpen } = useModal();

  const scrollToDiv = (divId: string) => {
    const div = document.getElementById(divId);
    const additionHeight = 65;
    if (div) {
      ref.current?.scrollTo({
        top: div?.offsetTop - additionHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const scroll = ref.current?.scrollTop || 0;
    const container = 522.6;
    const no = Math.floor(scroll / container);
    setCurrentMonth(months[no].tag);
  };

  useEffect(() => {
    scrollToDiv(months[date.getMonth()].tag);
    ref.current?.addEventListener("scroll", handleScroll);
    const a = ref.current;
    return () => {
      a?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (selectedMonth) {
      scrollToDiv(selectedMonth);
    }
  }, [selectedMonth]);
  return (
    <>
      <div className="grid grid-cols-7 absolute w-full h-[8vh] z-10 bg-white">
        {days.map((day) => (
          <p
            key={day}
            className={`h-full w-full flex justify-center items-center text-xl font-semibold py-2 border-2 border-white border-r-0 bg-slate-400/50 ${
              day === "Sunday" ? "text-rose-600" : ""
            }`}
          >
            {day}
          </p>
        ))}
      </div>
      <div className="pt-[8vh] overflow-scroll h-[90vh]" ref={ref}>
        {months.map((month, index) => {
          return (
            <div
              key={index}
              id={month.tag}
              className="grid grid-cols-7 h-full pb-2 "
            >
              {Array(new Date(2023, index, 1).getDay())
                .fill(0)
                .map((day, blankId) => {
                  return <div key={blankId} className="w-full"></div>;
                })}
              {Array(month.days)
                .fill(0)
                .map((days, dates: number) => {
                  return (
                    <button
                      key={dates}
                      className={`${
                        date.getDate() === dates + 1 &&
                        date.getMonth() === index
                          ? `bg-indigo-400/70 text-rose-700`
                          : ``
                      } border text-xl font-medium`}
                      onClick={() => {
                        onOpen({
                          date: dates + 1,
                          month: month.tag,
                          year: 2023,
                        });
                      }}
                    >
                      {dates + 1}
                    </button>
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
