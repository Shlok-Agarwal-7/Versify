export default function ClearTranscriptionItems(items) {
  if (!Array.isArray(items)) {
    console.warn('Invalid transcription object passed.');
    return;
}
       items.forEach((item, key) => {
          if (!item.start_time) {
            const prev = items[key - 1];
            prev.alternatives[0].content += item.alternatives[0].content;
            delete items[key];
          }
        });

        return items.map((item) => {
            const { start_time, end_time } = item;
            const content = item.alternatives[0].content;
            return { start_time, end_time, content };
          });
}