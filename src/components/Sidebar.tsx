import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { months } from "../data/data";
import { Ban, MoreVertical, Trash } from "lucide-react";

const Sidebar = () => {
  const date = new Date();
  const [events, setEvents] = useState<
    | null
    | {
        created_at: string;
        date: string | null;
        event: string | null;
        id: number;
        done: boolean | null;
      }[]
    | null
  >(null);
  const [dialog, setDialog] = useState(false);
  const [dialogId, setDialogId] = useState<number>();
  const getData = async () => {
    try {
      const { data } = await supabase
        .from("Events")
        .select("*")
        .eq(
          "date",
          `${date.getDate()}${months[date.getMonth()].tag}${date.getFullYear()}`
        )
        .order("done");
      if (data !== null) {
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateEvent = async (id: number, done: boolean | null) => {
    try {
      const { data, error } = await supabase
        .from("Events")
        .update({
          done: !done,
        })
        .eq("id", id)
        .select("*");

      if (error) {
        console.log(error);
      }
      console.log(data);

      getData();
    } catch (err) {
      console.error(err);
    }
  };
  const deleteEvent = async (id: number) => {
    try {
      const { error } = await supabase.from("Events").delete().eq("id", id);
      if (error) {
        console.log(error);
      }
      getData();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium text-xl pb-2 text-center border-b-2">
        Today&apos;s Events
      </h1>
      <div className="flex flex-col gap-2">
        {events &&
          events.map((event) => {
            return (
              <div
                key={event.id}
                className="flex flex-row gap-2 text-lg items-center justify-between font-normal cursor-pointer"
              >
                <div className="flex flex-row gap-1 items-center ">
                  <button
                    className={`p-[.35rem] border-2 border-black rounded-sm ${
                      event.done ? `bg-indigo-400` : ``
                    }`}
                    onClick={() => {
                      updateEvent(event.id, event.done);
                    }}
                  ></button>
                  <p
                    className={`capitalize tracking-wide ${
                      event.done ? `line-through` : ``
                    }`}
                  >
                    {event.event}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => {
                      setDialog((prev) => !prev);
                      setDialogId(event.id);
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {dialog && dialogId === event.id && (
                    <div className="absolute right-4 top-0 bg-white rounded-md shadow-md px-3 py-2 hover:bg-slate-100/70">
                      <button
                        className="flex flex-row justify-center items-center "
                        onClick={() => deleteEvent(dialogId)}
                      >
                        <Trash className="mr-2 h-4 w-4 text-rose-600" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {events?.length === 0 && (
        <h1 className="text-xl font-light flex justify-center items-center gap-1 pt-10">
          <Ban className="h-5 w-5 text-rose-400" />
          No current Events!
        </h1>
      )}
    </div>
  );
};

export default Sidebar;
