import Sparkles from "./Sparkles";

const DemoSection = () => {
  return (
    <div className="flex mt-4 gap-14 justify-center items-center">
      <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl overflow-hidden">
      <video src="/sample.mp4" autoPlay = {true} muted className="w-full h-full object-cover"/>
      </div>
      <div>
        <Sparkles />
      </div>
      <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl overflow-hidden">
      <video src="/finished_video.mp4" autoPlay = {true} muted className="w-full h-full object-cover"/>
      </div>
    </div>
  );
};

export default DemoSection;
