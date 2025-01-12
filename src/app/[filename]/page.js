"use client";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import ClearTranscriptionItems from "@/libs/ClearTranscriptionItems";
import axios from "axios";
import { useEffect, use, useState } from "react";

export default function FilePage({ params }) {
  const { filename } = use(params);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionItems, setTranscripitionItems] = useState([]);
  const [isFectching, setIsFetching] = useState(false);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetching(true);
    axios.get(`/api/transcribe?filename=${filename}`).then((response) => {
      setIsFetching(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === "IN-PROGRESS") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        ClearTranscriptionItems(transcription, setTranscripitionItems);
      }
    });
  }

  if (isFectching) {
    return <div>Loading...</div>;
  }

  if (isTranscribing) {
    return <div>Transcribing...</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <TranscriptionEditor
        transcriptionItems={transcriptionItems}
        setTranscripitionItems={setTranscripitionItems}
      />
      <div className="max-w-sm rounded-md overflow-hidden">
        <h2 className="text-2xl bold text-white/50 mb-4"> Result</h2>
        <ResultVideo filename={filename} transcriptionItems = {transcriptionItems} />
      </div>
    </div>
  );
}
