"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { User } from "../../components/types";
import { ArrowLeft, Circle } from "lucide-react";

import Link from "next/link";

const Page = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ifFollowing, setIfFollowing] = useState(false);
  // const [followingCount, setFollowingCount] = useState()
  // const [followerCount, setFollowerCount] = useState();
  const axios = useAxios();

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

  return (
    <>
      <div className="w-screen bg-neutral-800 h-[30vh] rounded">
        <div>
          <Link href={"/"}> 
          <div className="p-2" > <ArrowLeft></ArrowLeft> </div>
          </Link>
          <div className="flex flex-row pl-10">
            <Circle className="" size={180} />

            <div className="pt-4 pl-5 text-[20px]">
              <div className="text-[30px] font-[700]"> {user?.username} </div>
              {user?.fullname}

              <div className="pt-10 flex flex-row gap-20">
                <div>posts</div>
                <div>followers</div>
                <div>following</div>
              </div>

              <div className="flex gap-5 justify-center pt-6">
                <div className="bg-neutral-700 rounded w-50 flex justify-center">
                  Follow
                </div>

                <div className="bg-neutral-700 rounded w-50 flex justify-center">
                  {" "}
                  Messsage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="bg-neutral-800 flex justify-center font-[300]">
        {" "}
        Post{" "}
      </div>
      <hr></hr>
    </>
  );
};

export default Page;
