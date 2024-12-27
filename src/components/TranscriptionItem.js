import { useState } from "react";

export const TranscriptionItem = ({ item }) => {
  const [startTime, setStartTime] = useState(item.start_time);
  const [endTime, setEndTime] = useState(item.end_time);
  const [content, setContent] = useState(item.content);
  return (
    <div className="grid grid-cols-3 gap-2">
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.start_time}
        onChange={(e) => {
          setStartTime(e.target.value);
        }}
      />
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.end_time}
        onChange={(e) => {
          setEndTime(e.target.value);
        }}
      />
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </div>
  );
};
