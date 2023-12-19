import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { X } from "lucide-react";
import { supabase } from "../../supabase";
const EventModal = () => {
  const { isOpen, onClose, data } = useModal();
  const [input, setInput] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const eventDate = `${data.date}${data.month}${data.year}`;
  const time = new Date();

  const id =
    data.date +
    data.month.length +
    data.year +
    Math.floor(time.getHours()) +
    Math.floor(time.getMinutes()) +
    Math.floor(time.getMilliseconds()) +
    Math.floor(time.getSeconds());

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!input.trim()) {
        throw new Error("No name ,Event can't be empty");
      }
      const eventData = {
        id: id,
        event: input,
        date: eventDate,
        done: false,
      };
      const { data } = await supabase.from("Events").insert(eventData);
      console.log(data);
      setInput("");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[30vw] bg-white text-black flex flex-col gap-2 rounded-md px-4 py-6">
            <div className="border-b-2 pb-2 text-xl font-medium flex justify-between items-center">
              <p>
                {data.date} {data.month} , {data.year}
              </p>
              <button onClick={() => onClose()}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="pb-4">
              <p className="text-sm font-light px-1">Event</p>
              <input
                type="text"
                className="focus:ring-0 border-2 focus:ring-offset-0 rounded-md py-2 px-2 w-full disabled:bg-slate-400/70"
                placeholder="Enter event"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="pt-3 w-full flex items-center justify-end gap-2 border-t">
              <button
                className="px-4 hover:bg-slate-200/95 disabled:bg-slate-100/70 py-2 border-2 rounded-md"
                onClick={onClose}
                disabled={loading}
              >
                Close
              </button>
              <button
                className="px-4 bg-indigo-500 disabled:bg-indigo-400/70 text-white hover:bg-indigo-500/95 py-2 border-2 rounded-md"
                onClick={() => {
                  handleSave();
                }}
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventModal;
