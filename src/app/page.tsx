"use client";

import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Profile } from "@/components/profile";
import { OwnProfile } from "@/components/ownProfile";
import { PostPost } from "@/components/post";

export default function Home() {
 
  const { user, setToken, loading } = useContext(UserContext);

  console.log({ user, loading });

  if (loading) {
    return <>Loading....</>;
  }

  if (!user) {
   
    return redirect("/signin");
  }

  const handleLogout = () => {
    
    setToken(null);
  };

  return (
    <div className="rounded font-[500] text-[30px]">
      <div className="p-2 flex flex-row justify-between ">
        <div className="text-white font-display ">Instagram</div>
        <div className="p-2 flex gap-8">
          <img
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/023/743/935/small_2x/white-heart-outline-png.png"
            }
            className="w-8 h-7"
          />
          <div></div>
          <Button onClick={handleLogout}>Logout</Button>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvLl5UuxKRaI5MSMnC4_ujRJnHLeaYY3XFQ&s"
            }
            className="w-7 h-7"
          />
        </div>
      </div>
      <div className="p-2 flex gap-4">
        <OwnProfile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </div>
      <PostPost></PostPost>
    </div>
  );
}
