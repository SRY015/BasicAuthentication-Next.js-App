"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("User data : ", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 w-min mx-auto p-5 rounded-lg mt-10">
      <h1 className="text-center mb-2">
        <CgProfile className="mx-auto text-3xl mb-3" />
        {loading ? (
          <img
            className="w-20 h-20 mx-auto"
            src="https://media3.giphy.com/media/uIJBFZoOaifHf52MER/giphy.gif?cid=6c09b952tqhbs8go5qx6a9i293iojex6ydjo3h0v0i7qbz0g&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          />
        ) : (
          "Login"
        )}
      </h1>
      <hr />
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
        onClick={onLogin}
        className="bg-blue-600 p-3 mt-3 mb-2 rounded-lg w-full hover:bg-blue-500"
      >
        {!buttonDisabled && <FiLogIn className="inline-block mr-2 mb-[1px]" />}
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup" className="text-blue-800 font-light">
        Go to Signup page
      </Link>
    </div>
  );
}

export default LoginPage;
