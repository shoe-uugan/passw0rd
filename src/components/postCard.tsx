"use client";


import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  imageUrl: string;
  description: string;
};


export const PostPost = () => {
     const [posts, setPosts] = useState<Post[]>([]);
     const [liked, notLiked] = useState(false)
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
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 py-4">
          <img
            className="w-150 object-cover object-center"
            src={post.imageUrl}
            alt=""
          />

          <div className="flex gap-5 pt-5">
              <Link href={"/comments"}>
            <MessageCircle />
            </Link>
            <Heart
              onClick={handleLike}
              style={{
                fill: liked ? "none" : "red",
                color: liked ? "white" : "red",
                cursor: "pointer"
              }}
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
