import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <>
      <PageHeaders
        h1text="Add captions to your videos using Versify"
        h2text="Upload your videos we do the rest"
      />
      <UploadForm/>
      <DemoSection/>
    </>
  );
}
