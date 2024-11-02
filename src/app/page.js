import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import Upload from "@/components/Upload";

export default function Home() {
  return (
    <>
      <PageHeaders
        h1text="Add captions to your videos using Versify"
        h2text="Upload your videos we do the rest"
      />
      <div className="flex justify-center">
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2">
          <Upload />
          Choose File
        </button>
      </div>
      <DemoSection/>
    </>
  );
}
