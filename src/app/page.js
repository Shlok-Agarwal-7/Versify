import Sparkles from "@/components/Sparkles";
import Upload from "@/components/Upload";

export default function Home() {
  return (
    <main className="p-4 text-white min-width-2xl mx-auto">
      <header className="flex justify-between mb-8">
        <a href="" className="flex gap-2">
          <Sparkles/>
          Verseify
        </a>
        <nav className="flex gap-4">
          <a href="">Home</a>
          <a href="">Pricing</a>
          <a href="">About</a>
        </nav>
      </header>
      <div className="text-center mt-16">
        <div className="mb-4 text-white">
          <h1 className="text-2xl">
            Add captions to your videos with a click of the button
          </h1>
          <h2>Just upload your video we do the rest for you :) </h2>
        </div>
        <div className="flex justify-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2">
            <Upload/>
            Choose File
          </button>
        </div>
      </div>
      <div className="flex mt-4 gap-14 justify-center items-center">
        <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl" ></div>
        <div><Sparkles/></div>
        <div className="bg-gray-700/40 w-[240px] h-[480px] rounded-xl" ></div>
      </div>
    </main>
  );
}
