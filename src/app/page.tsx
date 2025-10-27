"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./providers/UserProvider";

import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Profile } from "@/components/profile";
// import { OwnProfile } from "@/components/ownProfile";
import { PostCard } from "@/components/postCard";
import { Post } from "../components/types";
import { Ghost, Heart, SquarePlus, User } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, loading } = useContext(UserContext);

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

  return (
    <div className="rounded font-[500] text-[30px]">
      {/* <Button onClick={handleLogout}>Logout</Button> */}

      <div className="p-2 flex flex-row justify-between ">
        <div className="text-white font-display ">Instagram</div>

        <div className="p-2 flex gap-8">
          <div></div>
          <Link href={`/${user.username}`}>
            <User />
          </Link>
          <Link href={"/create"}>
            <SquarePlus size={24} className="text-white" />
          </Link>
          <Heart className="text-white" />
        </div>
      </div>
      <div className="p-2 flex gap-4"></div>

      <div className="w-[600px] flex flex-col gap-4 mx-auto">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
