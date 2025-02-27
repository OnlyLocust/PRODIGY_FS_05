import React, { useState } from "react";
import ProfileHeader from "../ui/Profile/ProfileHeader";
import ProfileData from "../ui/Profile/ProfileData";
import axios from "axios";
import { setLoginInfo } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [isupdate, setupdate] = useState(false);
  // const [update , changeUpdate] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get(
        "https://posty-0rlh.onrender.com/api/user/logout",
        { withCredentials: true }
      );
      // alert(res.data.message)
      toast.success(res.data.message);
      dispatch(setLoginInfo(false));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border h-full flex flex-col">
      <ProfileHeader />
      <div className="grid grid-row-5 h-full">
        {!isupdate ? (
          <ProfileData className="row-span-4" />
        ) : (
          <UpdateProfile
            className="row-span-4"
            isupdate={isupdate}
            setupdate={setupdate}
          />
        )}
        <div className="flex flex-col gap-4  row-span-1 justify-center items-center">
          {
            !isupdate && (
              <>
                <div
                  className="border text-2xl text-center w-[50%] py-2 rounded-lg hover:scale-95 hover:text-orange-500 cursor-pointer"
                  isupdate={isupdate}
                  setupdate={setupdate}
                  onClick={() => setupdate(!isupdate)}
                >
                  Edit profile
                </div>
                <div
                  className="border text-2xl text-center w-[50%] py-2 rounded-lg hover:scale-95 hover:text-red-500 cursor-pointer"
                  onClick={() => logout()}
                >
                  logout
                </div>
              </>
            )

            // <div className='border text-2xl text-center w-[50%] py-2 rounded-lg hover:scale-95 hover:text-yellow-500 cursor-pointer' isupdate={isupdate} setupdate={setupdate} onClick={() => setupdate(!isupdate) } >Save Changes</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
