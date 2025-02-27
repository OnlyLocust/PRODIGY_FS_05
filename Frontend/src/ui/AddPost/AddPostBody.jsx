import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/postSlice";
import { changeOpenUploadPost } from "../../../store/authSlice";

const AddPostBody = () => {
  const dispatch = useDispatch();
  // const showLoading = () => { const loadingShow = toast.loading("Post Uploading")}

  const loading = useSelector((store) => store.posts.isLoading);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [desc, setDesc] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const uploadPost = async (e) => {
    // if(loading) showLoading()
    e.preventDefault();
    toast.loading("Post Uploading");
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("desc", desc);
    formData.append("file", file);

    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        "https://posty-0rlh.onrender.com/api/post/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.dismiss();
      toast.success("Upload successful!");
      dispatch(changeOpenUploadPost(false))
    } catch (error) {
      toast.dismiss();
      toast.error("Upload failed", error);
    } finally {
      setFile(null);
      setPreview("");
      setDesc("");
      dispatch(setLoading(false));
    }
  };

  return (
    // <div>
    <form method="post" className="flex flex-col justify-between h-[100%]">
      <div className="flex flex-col items-center space-y-4 m-4">
        <label className="flex flex-col items-center justify-center  border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 min-w-[30%] max-w-[80%] h-[300px]">
          {preview ? (
            file.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            )
          ) : (
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-8m-4 4 4-4 4 4M4 12a8 8 0 1116 0A8 8 0 014 12z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to upload file</p>
              <p className="text-xs text-gray-500">
                JPG, PNG, MP4, MOV (Max: 10MB)
              </p>
            </div>
          )}
          <input
            type="file"
            name="post"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && <p className="text-sm text-gray-700">Uploaded: {file.name}</p>}
      </div>
      <div className="m-auto w-[90%]  rounded-lg my-2 font-bold text-2xl">
        Description :{" "}
      </div>
      <div className="flex flex-col justify-center items-center">
        <textarea
          name="decription"
          rows="5"
          className="m-auto w-[90%] bg-gray-300 text-black rounded-lg my-4 font-semibold font-mono p-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-center m-4">
        <button
          className={`border text-2xl text-center w-[50%] py-2 rounded-lg hover:scale-95 hover:text-green-500 cursor-pointer ${
            loading && "cursor-not-allowed"
          }`}
          onClick={uploadPost}
        >
          Upload Post
        </button>
      </div>
    </form>
    // </div>
  );
};

export default AddPostBody;
