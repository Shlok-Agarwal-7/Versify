import Sparkles from "./Sparkles";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import ConvertItemsToSRT from "./../libs/ConvertItemsToSRT";
import Roboto from "./../fonts/Roboto-Regular.ttf";

const ResultVideo = ({ filename, transcriptionItems }) => {
  const VideoURL = `https://versify-bucket.s3.amazonaws.com/${filename}`;
  const [loaded, setLoaded] = useState(false);
  const [PrimaryColour, setPrimaryColour] = useState("#FFFFFF");
  const [OutlineColour, setOutlineColour] = useState("#000000");
  const [progress, setProgress] = useState(1);
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
    await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(Roboto));
    setLoaded(true);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = ConvertItemsToSRT(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(VideoURL));
    await ffmpeg.writeFile("subs.srt", srt);
    videoRef.current.src = VideoURL;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message.trim());
      if (regexResult && regexResult?.[1]) {
        const elapsedTime = regexResult?.[1];
        const [hours, minutes, seconds] = elapsedTime.split(":");
        const totalSecondsDone = hours * 3600 + minutes * 60 + seconds;
        const totalProgress = totalSecondsDone / duration;
        setProgress(totalProgress);
      }
    });
    await ffmpeg.exec([
      "-i",
      filename,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='FontName=Roboto,FontSize=24,MarginV = 150,PrimaryColour=${toffmpegcolor(
        PrimaryColour
      )},OutlineColour=${toffmpegcolor(OutlineColour)}'`,
      "output.mp4",
    ]);
    setProgress(1);
    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
  };

  const toffmpegcolor = (rgb) => {
    return "&H" + rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3) + "&";
  };

  return (
    <>
      <div className="mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 mb-2 rounded-xl flex gap-2 cursor-pointer"
          onClick={transcode}
        >
          <Sparkles />
          Apply Captions
        </button>
        Primary Color :
        <input
          type="color"
          value={PrimaryColour}
          className="bg-transparent"
          onChange={(e) => setPrimaryColour(e.target.value)}
        />
        <br />
        Outline Color :
        <input
          type="color"
          value={OutlineColour}
          className="bg-transparent"
          onChange={(e) => setOutlineColour(e.target.value)}
        />
      </div>
      <div className="rounded-xl overflow-hidden relative">
        {progress && progress < 1 && (
          <div className="absolute inset-0 bg-black/80 flex items-center">
            <div className="w-full text-center">
              <h3 className="text-white w-full text-center">
                {parseInt(progress * 100)}%
              </h3>
              <div className="bg-bg-gradient-from/30 m-8 h-2">
                <div
                  className="bg-bg-gradient-from h-2" style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <video ref={videoRef} controls />
      </div>
    </>
  );
};

export default ResultVideo;
