import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";

const Profile = () => {
  // For Login/Logoout
  const [checkLogin, setCheckLogin] = useState(false);
  const [nameFromJWT, setNameFromJWT] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [about, setAbout] = useState('About section not updated.');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [inpPicUrl, setInpPicUrl] = useState('')
  const [inpName, setInpName] = useState('')
  const [inpAbout, setInpAbout] = useState('')

  const { name: userName } = useParams();


  const handleOpen = () => setOpen(!open);

  useEffect(() => {

    const checkLoginFunc = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/v1/checklogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setCheckLogin(true);
          setNameFromJWT(data.message.name)
        } else {
          setCheckLogin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };



    const getUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/getUserDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userName }),
          }
        );
        const data = await response.json();
        setName(data.message.name);
        { data.message.profilePicUrl && setProfilePicUrl(data.message.profilePicUrl) }
        { data.message.about && setAbout(data.message.about) }
        { data.message.followers && setFollowers(data.message.followers) }
        { data.message.following && setFollowing(data.message.following) }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();
    checkLoginFunc();
  }, []);


  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profilePicUrl: inpPicUrl? inpPicUrl : profilePicUrl,
            name: inpName? inpName : name,
            about: inpAbout? inpAbout : about,
          }),
        }
      );
      const data = await response.json();
      { data.message.name && setName(data.message.name) }
      { data.message.profilePicUrl && setProfilePicUrl(data.message.profilePicUrl) }
      { data.message.about && setAbout(data.message.about) }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl w-[70%]">
          <span className="w-24 h-24 rounded-full object-cover flex justify-center items-center text-white text-5xl text-center font-bold mx-auto bg-[#6469ff]">
            {
              profilePicUrl ? <img className="object-contain" src={profilePicUrl} alt="" /> : name[0]?.toUpperCase()
            }
            {/* {name[0]?.toUpperCase()} */}
            {/* <img className="object-contain" src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1687541643/Personal/DP_circle_o9wokj.png" alt="" /> */}
          </span>
          <div className="space-y-4 text-center divide-y">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>


              {/* <!-- Bio --> */}
              <div className="mt-2 flex items-center justify-center">
                <div className="mt-2 text-sm w-[100%] sm:w-[50%]">
                  {about}
                </div>
              </div>
            </div>

            {/* <!-- Followers/FOllowing --> */}
            <div className="border-t border-gray-200">
              <div className="flex divide-x divide-gray-200r">
                <a
                  className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <span>{followers} Followers</span>
                  </div>
                </a>
                <button
                  // onClick={handleOpen}
                  className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <span>{following} Following</span>
                  </div>
                </button>
              </div>
            </div>


            {/* <!-- Update Profile --> */}
            <div className="border-t border-gray-200">
              <div className="flex divide-x divide-gray-200r">
                <a
                  className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 fill-current flex-shrink-0 mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                    </svg>
                    <span>Chat</span>
                  </div>
                </a>
                {nameFromJWT === userName ? <button
                  onClick={handleOpen}
                  className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                    </svg>
                    <span>Edit Profile</span>
                  </div>
                </button> : <button
                  // onClick={handleOpen}
                  className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <span>Follow</span>
                  </div>
                </button>
                }


                {/* Dialog implementation */}
                <Dialog open={open} handler={handleOpen}>
                  <div className="flex items-center justify-between">
                    <DialogHeader>Update Profile</DialogHeader>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3 h-5 w-5"
                      onClick={handleOpen}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <DialogBody divider>
                    <div className="grid gap-6">
                      <Input onChange={(e)=> setProfilePicUrl(e.target.value)} label="Profile Picture URL" />
                      <Input onChange={(e)=> setName(e.target.value)} label="Name" />
                      <Textarea onChange={(e)=> setAbout(e.target.value)} label="About" />
                    </div>
                  </DialogBody>
                  <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpen}>
                      close
                    </Button>
                    <Button
                      variant="gradient"
                      // color="green"
                      onClick={()=> {
                        handleOpen();
                        updateProfile();
                      }}
                    >
                      update profile
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
