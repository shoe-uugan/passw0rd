"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";

import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Profile } from "@/components/profile";
import { OwnProfile } from "@/components/ownProfile";
import { PostPost } from "@/components/post";
import { Heart, SquarePlus } from "lucide-react";


type Post = {
  _id: string;
  imageUrl: string;
  description: string;
};

export default function Home() {
 const [posts, setPosts] = useState<Post[]>([]);
  const { user, setToken, loading } = useContext(UserContext);

  console.log({ user, loading });
 useEffect(() => {
   fetch("http://localhost:5500/posts")
     .then((res) => res.json())
     .then((data) => {
       setPosts(data);
     });
 }, []);

  if (loading) {
    return <>Loading...</>;
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
          <div>
      
          </div>
          <Link href={"/create"}>
            <SquarePlus size={24} className="text-white"/>
          </Link>
                <Heart className="text-white" />
          {/* <Button onClick={handleLogout}>Logout</Button> */}
        </div>
      </div>
      <div className="p-2 flex gap-4"></div>

      <div className="w-[600px] flex flex-col gap-4 mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="mb-4 border-b py-4">
            
            <img src={post.imageUrl} alt="" />
            {post.description}
          </div>
        ))}
      </div>
    </div>
  );
}
