"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CgProfile } from "react-icons/cg";

function page() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      console.log("Error in signup : ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 w-min mx-auto p-5 rounded-lg mt-10">
      <CgProfile className="text-3xl mx-auto mb-3" />
      <h1 className="text-center mb-2">
        {loading ? (
          <img
            className="w-20 h-20 mx-auto"
            src="https://media3.giphy.com/media/uIJBFZoOaifHf52MER/giphy.gif?cid=6c09b952tqhbs8go5qx6a9i293iojex6ydjo3h0v0i7qbz0g&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          />
        ) : (
          "Singup"
        )}
      </h1>
      <hr />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        className="mt-3 p-3 rounded-lg text-black"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        className="mt-3 p-3 rounded-lg text-black"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        className="mt-3 p-3 rounded-lg text-black"
      />
      <button
        onClick={onSignup}
        className={`bg-blue-600 p-3 mt-3 mb-2 rounded-lg w-full hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login" className="text-blue-800 font-light">
        Go to login page
      </Link>
    </div>
  );
}

export default page;
