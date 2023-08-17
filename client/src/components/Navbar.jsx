import React, { useEffect, useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../pages/Login";
import axios from "axios";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [name, setName] = useState('')

  useEffect(() => {
    // console.log(user);
    const getJWT = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/getjwt",
          {
            name: user?.nickname,
            email: user?.email,
          }
        );
        localStorage.setItem("token", data.token);
        setName(data.user.name);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getJWT();
  }, [user]);

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 p-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          {/* <img src={logo} alt="logo" className="w-28 object-contain" /> */}
          <h1 className="font-sans text-3xl font-bold text-slate-500 hover:text-black italic ">
            IMAGINE
          </h1>
        </Link>

        <div className="flex">
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2"
          >
            Create
          </Link>

          {(isAuthenticated && name) ? (
            <div className="flex items-center">
              <button
                // onClick={logOut}
                // to="/"
                onClick={() => {
                  logout({ logoutParams: { returnTo: window.location.origin } })
                  localStorage.removeItem("token");
                }
                }
                className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2"
              >
                LogOut
              </button>
              <Link
                to={`/profile/${name}`}
                className="w-10 h-10 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-3xl text-center font-bold"
              >
                {name[0]?.toUpperCase()}
              </Link>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
