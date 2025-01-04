import Sparkles from "./Sparkles";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

const ResultVideo = ({ filename, transcriptionItems }) => {
  const VideoURL = `https://versify-bucket.s3.amazonaws.com/${filename}`;
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = VideoURL;
    load();
  }, []);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.7/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `http://localhost:3000/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `http://localhost:3000/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(
      "input.webm",
      await fetchFile(
        "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm"
      )
    );
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    console.log(transcriptionItems);
    await ffmpeg.exec(["-i", "input.webm", "output.mp4"]);
    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
  };

  return (
    <>
      <div className="mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2 cursor-pointer"
          onClick={transcode}>
          <Sparkles />
          Apply Captions
        </button>
      </div>
      <div className="rounded-xl overflow-hidden">
        <video ref={videoRef} controls />
      </div>
    </>
  );
};

export default ResultVideo;
