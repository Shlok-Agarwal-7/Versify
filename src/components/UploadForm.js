"use client";
import Upload from "@/components/Upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const UploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  async function upload(e) {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      const res = await axios.postForm("/api/upload", { file });
      setIsUploading(false);
      const newName = res.data.newName;
      router.push('/' + newName);
    }
  }
  return (
    <>
      {isUploading ? (
        <div className="bg-black/50 fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin"></div>
            <p className="text-white">Uploading</p>
          </div>
        </div>
      ) : null}
      <div className="flex justify-center">
        <label className="bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2 cursor-pointer">
          <Upload />
          Choose File
          <input onChange={upload} type="file" className="hidden" />
        </label>
      </div>
    </>
  );
};

export default UploadForm;
