export default function ClearTranscriptionItems(transcription, setTranscripitionItems) {
  if (!transcription || !transcription.results || !Array.isArray(transcription.results.items)) {
    console.warn('Invalid transcription object passed.');
    return;
}
        transcription.results?.items.forEach((item, key) => {
          if (!item.start_time) {
            const prev = transcription.results?.items[key - 1];
            prev.alternatives[0].content += item.alternatives[0].content;
            delete transcription.results?.items[key];
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