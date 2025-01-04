import { TranscriptionItem } from "./TranscriptionItem";

const  TranscriptionEditor = ({transcriptionItems,setTranscripitionItems}) => {

    function UpdateTranscriptionItem(index,ev,prop){
        const updatedItems = [...transcriptionItems];
        updatedItems[index][prop] = ev.target.value;
        setTranscripitionItems(updatedItems);
      }

    return(
        <div className="max-w-sm">
        <h2 className="text-2xl bold text-white/50 mb-8"> Transcription</h2>
        <div className="grid grid-cols-3 gap-2 bg-pink-800/80">
          <div className="">Start Time</div>
          <div>End Time</div>
          <div>Content</div>
        </div>
        {transcriptionItems.length > 0 &&
          transcriptionItems.map((item, index) => (
            <TranscriptionItem item={item}
             key={index}
             HandleItemEndTimeChange={ev => UpdateTranscriptionItem(index,ev,'end_time')}
             HandleItemStartTimeChange={ev =>UpdateTranscriptionItem(index,ev,'start_time')}
             HandleItemContentChange = {ev =>UpdateTranscriptionItem(index,ev,'content')} />
          ))}
      </div>
    )
    
}

export default TranscriptionEditor;