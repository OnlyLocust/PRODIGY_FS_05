import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import initialProfile from "./../../public/initial.jpg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { refresh } from "../../store/authSlice";

const UpdateProfile = ({ isupdate, setupdate }) => {
  const dispatch = useDispatch();

  const showLoading = () => {
    const loadingShow = toast.loading("Updating user profile");
  };

  const user = useSelector((store) => store.auth.user);
  const [username, setUsername] = useState(user.username);
  // const [profile , setProfile] = useState(user.profile)
  const [dob, setdob] = useState(user.dob);
  const [gender, setGender] = useState(user.gender);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    user.profile ? user.profile : initialProfile
  );

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const changeProfile = async () => {
    // console.log(username , file , dob , gender);
    const formData = new FormData();
    if (username != user.username && username !== "") {
      formData.append("username", username);
    }
    if (gender != user.gender && gender !== "") {
      formData.append("gender", gender);
    }

    if (dob != user.dob && dob) formData.append("dob", dob);
    if (file) formData.append("file", file);
    showLoading();
    try {
      const res = await axios.put(
        "https://posty-0rlh.onrender.com/api/user/update",
        formData,
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("Profile update successful!");
      setupdate(!isupdate);
      dispatch(refresh());
    } catch (error) {
      toast.dismiss();
      toast.error("Profile Update failed", error);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center space-y-4 m-4">
        {/* <img src={user.profile ? user.profile : initialProfile}  alt="profile" className=' h-[150px] w-[150px] rounded-[50%] '/>
         */}
        <label className="flex flex-col items-center justify-center  border-2 border-dashed border-gray-400 cursor-pointer bg-gray-50 hover:bg-gray-100 min-w-[30%] max-w-[80%]   h-[150px] w-[150px] rounded-[50%] mt-4">
          <img
            src={preview}
            alt="Preview"
            className=" h-[150px] w-[150px] rounded-[50%]  m-auto "
          />
          <input
            type="file"
            name="post"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* {file && <p className="text-sm text-gray-700">Uploaded: {file.name}</p>} */}
      </div>
      <div className="text-4xl flex flex-col gap-3 m-8 ">
        <hr />

        <div className="flex">
          <span className="font-bold mx-4">name :</span>{" "}
          <input
            type="text"
            placeholder={user.username}
            className="text-sm text-center p-auto align-middle font-thin font-mono border text-white rounded-2xl "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <hr />
        <div className="flex">
          <span className="font-bold mx-4">dob :</span>{" "}
          <input
            type="date"
            placeholder={user.dob ? user.dob : "xx/xx/xxx"}
            className="text-sm text-center px-2 align-middle font-thin font-mono border text-white rounded-2xl "
            onChange={(e) => setdob(e.target.value)}
          />
          <span className="text-sm flex justify-center items-center p-2 text-amber-700">
            {" "}
            {user.dob ? user.dob : "xx/xx/xxx"}
          </span>
        </div>
        <hr />
        <div className="flex">
          <span className="font-bold mx-4">gender :</span>
          <input
            type="text"
            placeholder='"M" or "F" or "N/A"'
            className="text-sm w-auto text-center p-auto align-middle font-thin font-mono border text-white rounded-2xl "
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <hr />
        {/* {user.dob ? user.dob : 'xx/xx/xxx'} */}
      </div>
      <div className="flex flex-col gap-4  row-span-1 justify-center items-center">
        {isupdate && (
          <div
            className="border text-2xl text-center w-[50%] py-2 rounded-lg hover:scale-95 hover:text-yellow-500 cursor-pointer"
            onClick={() => {
              changeProfile();
            }}
          >
            Save Changes
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
