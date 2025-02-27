import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoginInfo } from "../../store/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://posty-0rlh.onrender.com/api/user/login",
          { username, password },
          { withCredentials: true }
        );
        // alert(res.data.message)
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        dispatch(setLoginInfo(true));
      } else {
        const res = await axios.post(
          "https://posty-0rlh.onrender.com/api/user/signup",
          { username, password },
          { withCredentials: true }
        );
        // alert(res.data.message)
        toast.success(res.data.message);
        dispatch(setLoginInfo(true));
      }

      navigate("/");
    } catch (error) {
      setUsername("");
      setPassword("");
      toast.error("Login or Signup failed");
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] border flex justify-center items-center bg-[#444444] text-white">
      <div className="border flex flex-col p-8  rounded-lg w-[35%]  justify-center gap-2 bg-[#242424]">
        <div className="text-4xl text-center m-1 font-bold ">
          {isLogin ? "Log - In" : "Sign - Up"}
        </div>
        <hr />
        <form method="post" className="p-1 flex flex-col text-xl">
          <div className="my-1 font-semibold">Enter username : </div>
          <input
            type="text"
            name="username"
            className="my-1 w-full border p-2 "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="my-1">Enter password : </div>
          <input
            type="password"
            name="password"
            className="my-2 w-full border p-2  font-semibold"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value={isLogin ? "Login" : "Signup"}
            className=" w-full border my-4 py-1 text-md rounded-sm cursor-pointer hover:scale-95 font-bold hover:text-green-400"
            onClick={(e) => submitData(e)}
          />
          <hr />
        </form>
        <div className="text-center text-sm my-3">
          {" "}
          {isLogin
            ? "You Don't Have an account ? "
            : "You already have an account"}
        </div>
        <button
          className=" w-full border my-4 py-1 text-md rounded-sm cursor-pointer hover:scale-95  font-bold hover:text-blue-400"
          onClick={() => setLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </button>
        {/* <Toaster position="top-right" /> */}
      </div>
    </div>
  );
};

export default Login;
