"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { User } from "../../../providers/types";
import { Circle } from "lucide-react";

const Page = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
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

  return <>
  <div className="w-screen bg-neutral-800 h-[30vh] rounded"> 
    <div>
  <div className="flex flex-row pt-10 pl-10"> 
    <Circle className="" size={200}/>

  <div className="pt-4 pl-5 text-[20px]">
   <div className="text-[30px] font-[700]"> {user?.username} </div>
    {user?.fullname}

<div className="pt-10 flex flex-row gap-20" > 
    <div>Posts</div>
    <div>Followers</div>
    <div>Following</div>
    </div> 
 
    </div>
  

 </div>

  </div>

  </div>
  <hr></hr>
  <div className="bg-neutral-800 flex justify-center font-[300]"> Post </div>
   <hr></hr>
  
  
  
  </>;
};

export default Page;
