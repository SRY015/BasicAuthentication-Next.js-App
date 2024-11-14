"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";

function Profilepage() {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const result = await axios.get("/api/users/me");
    console.log(result.data);
    setUserDetails(result.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="w-[20%] text-center border-2 mx-auto mt-10 rounded-md p-2">
      <CgProfile className="mx-auto text-3xl" />
      <h1>Profile</h1>
      {userDetails && (
        <h3 className="my-2">
          Hello{" "}
          <span className="text-white bg-orange-500 p-1">
            {userDetails.username}
          </span>
          , welcome to your profile
        </h3>
      )}
      <hr />
      <button
        onClick={logout}
        className="bg-blue-600 px-3 py-1 rounded-md my-3 hover:bg-slate-400"
      >
        <FaSignOutAlt className="inline-block mr-2" />
        Logout
      </button>
    </div>
  );
}

export default Profilepage;
