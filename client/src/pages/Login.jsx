import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();


  // useEffect(() => {
  //   const getJWT = async ()=> {
  //     try {
  //       const { data } = await axios.post("http://localhost:8080/api/v1/getjwt", {
  //         name: user?.nickname,
  //         email: user?.email,
  //       });
  //       localStorage.setItem("token", data.token);
  //       console.log(data.token);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getJWT();
  // }, [user])
  

  return (
    <button
    // to="/login"
    onClick={async() => await loginWithRedirect()}
    className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
  >
    LogIn
  </button>
  );
};

export default Login;
