"use client";
import ResultVideo from "@/components/ResultVideo";
import Sparkles from "@/components/Sparkles";
import { TranscriptionItem } from "@/components/TranscriptionItem";
import axios from "axios";
import { Result } from "postcss";
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
      if (status === "In-Progress") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        transcription.results?.items.forEach((item, key) => {
          if (!item.start_time) {
            const prev = transcription.results?.items[key - 1];
            prev.alternatives[0].content += item.alternatives[0].content;
            delete transcription.results.items[key];
          }
        });
        setTranscripitionItems(
          transcription.results?.items.map((item) => {
            const { start_time, end_time } = item;
            const content = item.alternatives[0].content;
            return { start_time, end_time, content };
          })
        );
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
      <div className="max-w-sm">
        <h2 className="text-2xl bold text-white/50 mb-8"> Transcription</h2>
        <div className="grid grid-cols-3 gap-2 bg-pink-800/80">
          <div className="">Start Time</div>
          <div>End Time</div>
          <div>Content</div>
        </div>
        {transcriptionItems.length > 0 &&
          transcriptionItems.map((item, index) => (
            <TranscriptionItem item={item} key={index} />
          ))}
      </div>
      <div className="max-w-sm rounded-md overflow-hidden">
        <h2 className="text-2xl bold text-white/50 mb-4"> Result</h2>
        <ResultVideo filename={filename} />
      </div>
    </div>
  );
}
