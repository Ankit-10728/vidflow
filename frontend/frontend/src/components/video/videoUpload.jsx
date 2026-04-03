import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadVideo, getVideoById } from "../../features/video/videoApi";
import { useDispatch } from "react-redux";
import { LoaderProgress } from "../../components"

const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.src = URL.createObjectURL(file);
  });
};

export default function VideoUpload() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    videoFile: null,
    thumbnail: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state?.video?.loading?.upload)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration = await getVideoDuration(formData.videoFile);
    const data = new FormData();
    console.log(formData)
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("duration", duration);
    data.append("video", formData.videoFile);
    data.append("thumbnail", formData.thumbnail);
    console.log("at the end")
    console.log("Submitting:", Object.fromEntries(data));
    let uploadedVideo = null;
    try {
      uploadedVideo = await dispatch(uploadVideo(data)).unwrap();
      console.log(uploadedVideo)
    } catch (error) {
      console.error("Error uploading video:", error);
    }

    if (uploadedVideo) navigate(`/post/${uploadedVideo?.data?._id}`)
    setFormData({ title: "", description: "", videoFile: null, thumbnail: null })

  };

  return (
    <>
      {!loading ?
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-6">


            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-1 text-xl">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-xl">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
                  required
                />
              </div>


              <div className=" w-full flex">
                <label className="block  text-xl m-4 ml-0 w-auto">VideoFile</label>
                <input
                  type="file"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleChange}
                  className="w-full text-sm m-4"
                  required
                />
              </div>


              <div className="flex">
                <label className="block mb-1 text-xl m-4 ml-0">Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm m-4"
                  required
                />
              </div>


              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
              >
                Upload Video
              </button>
            </form>
          </div>
        </div>
        : <div className="h-screen flex flex-col justify-center items-center">
          <LoaderProgress />
          <p className="text-lg">uploadind video...</p>
        </div>
      }
    </>
  );
}