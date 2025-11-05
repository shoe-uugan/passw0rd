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
  const [following, setFollowing] = useState(false);
   const [posts, setPosts] = useState<Post[]>([]);
  const [followingCount, setFollowingCount] = useState<number>(0)
  const [followerCount, setFollowerCount] = useState<number>(0)
  const axios = useAxios();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch( process.env.NEXT_PUBLIC_API_URL +"/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);


  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL +`/users/${username}/follow`)
      .then((res) => res.json())
      .then((data) => {
        setFollowing(data);
      });
  }, []);
console.log(following)


  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/${username}/followings`)
      .then((res) => res.json())
      .then((data) => {
        setFollowingCount(data);
      });
  }, []);
  console.log(followingCount);


  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${username}/followers`)
      .then((res) => res.json())
      .then((data) => {
        setFollowerCount(data);
      });
  }, []);
  console.log(followerCount);

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

  
console.log(userd)
  if (loading) return <><img src={"https://image.similarpng.com/file/similarpng/very-thumbnail/2020/07/Instagram-black-and-white-logo-vector-png-(5).png"}></img></>;
  if (isNotFound) return <>User with username {username} not found!</>;


// console.log(userd?.username)
// console.log(user?.username)
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
                <div>followers {followerCount }</div>
                <div>following {followingCount }</div>
              </div>

              {user?.username !== userd?.username ? (
                <div className="flex gap-5 justify-center pt-6">

                  <div className="bg-neutral-700 rounded w-50 flex justify-center hover:opacity-60 cursor-pointer"

                        onClick={async () => {
                          const response = await axios.post(
                            `/users/${username}/follow`
                          );
                          setFollowing(response.data.following);

                          if (response.data.following ) {
                            setFollowing(following);
                          } else {
                            setFollowing(!following);
                          }
                        }}
                      >
                        {!following ? <div>Follow</div> : <div>Following</div>}
                   
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

