"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { User } from "../../components/types";
import { ArrowLeft, Circle } from "lucide-react";
import { Post } from "../../components/types";
import Link from "next/link";
import { PostCard } from "@/components/postCard";
import { stringify } from "querystring";
import { UserContext } from "../providers/UserProvider";

const Page = () => {
  const { username } = useParams();
  const [userd, setUser] = useState<User | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ifFollowing, setIfFollowing] = useState(false);
   const [posts, setPosts] = useState<Post[]>([]);
  // const [followingCount, setFollowingCount] = useState()
  // const [followerCount, setFollowerCount] = useState();
  const axios = useAxios();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5500/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/users/${username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {
        if (res.status === 404) {
          setIsNotFound(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <>Loading...</>;
  if (isNotFound) return <>User with username {username} not found!</>;



console.log(userd?.username)
console.log(user?.username)
  return (
    <>
      <div className="w-screen bg-neutral-800 h-[30vh] rounded">
        <div>
          <Link href={"/"}>
            <div className="p-2">
              {" "}
              <ArrowLeft></ArrowLeft>{" "}
            </div>
          </Link>
          <div className="flex flex-row pl-10">
            <Circle className="" size={180} />

            <div className="pt-4 pl-5 text-[20px]">
              <div className="text-[30px] font-[700]"> {userd?.username} </div>
              {userd?.fullname}
              <div className="pt-10 flex flex-row gap-20">
                <div>posts</div>
                <div>followers</div>
                <div>following</div>
              </div>

              {user?.username !== userd?.username ? (
                <div className="flex gap-5 justify-center pt-6">
                  <div className="bg-neutral-700 rounded w-50 flex justify-center">
                    Follow
                  </div>

                  <div className="bg-neutral-700 rounded w-50 flex justify-center">
                    {" "}
                    Messsage
                  </div>
                </div>
              ) : (
                  <div className="flex gap-5 justify-center pt-6">
                <div className="bg-neutral-700 rounded w-110 flex justify-center">
                  Edit
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="bg-neutral-800 flex justify-center font-[300]">Post</div>
      <hr></hr>
      <div className="flex ">
        {posts
          .filter((post) => post.createdBy.username === userd?.username)

          .map((post) => (
            <div key={post._id}>
              <img
                src={post.imageUrl}
                className="h-90 w-70 object-cover flex flex-row hover:opacity-50"
              ></img>
            </div>
          ))}
      </div>
    </>
  );
};

export default Page;

