import Sparkles from "./Sparkles";

 const ResultVideo = ({filename}) => {
    return(
        <>
        <div className="mb-4">
            <button className = "bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2 cursor-pointer">
                <Sparkles/>
                Apply Captions
            </button>
        </div>
        <div className="rounded-xl overflow-hidden">
        <video
          controls
          src={`https://versify-bucket.s3.amazonaws.com/${filename}`}
        />
        </div>
        </>
    )
}

export default ResultVideo;