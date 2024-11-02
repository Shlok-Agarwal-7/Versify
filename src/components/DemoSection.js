import Sparkles from "./Sparkles";

const DemoSection = () => {
  return (
    <div className="flex mt-4 gap-14 justify-center items-center">
      <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl"></div>
      <div>
        <Sparkles />
      </div>
      <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl"></div>
    </div>
  );
};

export default DemoSection;
