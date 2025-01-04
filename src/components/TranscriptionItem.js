
export const TranscriptionItem = ({
  item,
  HandleItemStartTimeChange,
  HandleItemEndTimeChange,
  HandleItemContentChange, 
  }) => {
    if(!item){
      return '';
    }
  return (
    <div className="grid grid-cols-3 gap-2">
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.start_time}
        onChange={HandleItemStartTimeChange}
      />
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.end_time}
        onChange={HandleItemEndTimeChange}
      />
      <input
        className="bg-white/20 p-1 rounded-md my-1"
        type="text"
        value={item.content}
        onChange={HandleItemContentChange}
      />
    </div>
  );
};
