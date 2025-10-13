"use client";


import { Heart, MessageCircle, Send, Bookmark, HatGlasses } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  username: string
}

type Post = {
  createdBy: User;
  _id: string;
  imageUrl: string;
  description: string;
};


export const PostPost = () => {
     const [posts, setPosts] = useState<Post[]>([]);
     const [liked, notLiked] = useState(false)
     const [profile, noProfile] = useState(false)
      useEffect(() => {
        fetch("http://localhost:5500/posts")
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
          });
      }, []);
     
      const handleLike=()=>{
        notLiked(!liked) 
      }

      const handleProfile=()=>{
        noProfile(!profile)
      }
     
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 py-4">
          <div className="flex flex-row gap-2 pb-2">
            <HatGlasses
              fill="white"
              color="black"
              className="border rounded-full border bg-white self-center"
              style={{
                opacity: profile ? "0%" : "100%",
              }}
            />
            <div className="text-[22px]"> {post.createdBy.username}</div>
          </div>

          <img
            className="w-150 object-cover object-center"
            src={post.imageUrl}
            alt=""
          />

          <div className="flex gap-5 pt-5">
            {/* <Link href={"/comments"}> */}
              <a
        href={`/comments/${post._id}` }
      >
              <MessageCircle />
              </a>
            {/* </Link> */}
            <Heart
            // onClick={handleLike}
            // style={{
            //   fill: liked ? "none" : "red",
            //   color: liked ? "white" : "red",
            //   cursor: "pointer",
            // }}
            />
            <Send />
          </div>
          <div className="flex justify-between">
            <div></div>
            <Bookmark size={34} />
          </div>
          <div className="text-[18px]"> {post.description}</div>
        </div>
      ))}
    </div>
  );
};
