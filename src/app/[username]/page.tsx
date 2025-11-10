"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { User } from "../../components/types";
import { ArrowLeft, Circle, Upload } from "lucide-react";
import { Post } from "../../components/types";
import Link from "next/link";
import { PostCard } from "@/components/postCard";
import { stringify } from "querystring";
import { UserContext } from "../providers/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

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
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [previewUrl, setPreviewUrl] = useState<string>("");
 const [imageUrl, setImageUrl] = useState("");
   const [uploading, setUploading] = useState(false);
  const router = useRouter();

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
  if (loading) return (
    <>
      <div className="flex place-content-center p-70">
        <div className="flex flex-col">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/2/28/Instagram_logo.png"
            }
            className="w-30 h-30"
          ></img>
          <div className="p-2 pl-5"> instagram</div>
        </div>
      </div>
    </>
  );
  if (isNotFound) return <>User with username {username} not found!</>;




// profile

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch(`/users/${username}/profile`, {
        method: "PUT",
        body: formData,
      });

      console.log(uploadResponse);

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }
      // toast.success("Post created successfully!");
      // router.push("/");

      const { url: imageUrl } = await uploadResponse.json();

      const response = await axios.put(`/users/${username}/profile`, {
        imageUrl,
      });

      console.log(response);
      toast.success("Post created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  function handleLogout() {
    localStorage.removeItem("authToken"); 

    window.location.href = "/signin"; 
  }

console.log(userd?.username)
console.log(following)
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
            <Avatar>
              {!previewUrl ? (
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="h-60 w-60 rounded-full"
                />
              ) : (
                <AvatarImage
                  src={previewUrl}
                  className="h-60 w-60 rounded-full"
                />
              )}
              <AvatarFallback className="h-60 w-60 rounded-full">
                a
              </AvatarFallback>
            </Avatar>

            <div className="pt-4 pl-5 text-[20px]">
              <div className="text-[30px] font-[700]"> {userd?.username} </div>
              {userd?.fullname}
              <div className="pt-10 flex flex-row gap-20">
                <div>posts</div>
                <div>followers {followerCount}</div>
                <div>following {followingCount}</div>
              </div>

              {user?.username !== userd?.username ? (
                <div className="flex gap-5 justify-center pt-6">
                  <div
                    className="bg-neutral-700 rounded w-50 flex justify-center hover:opacity-60 cursor-pointer"
                    onClick={async () => {
                      const response = await axios.post(
                        `/users/${username}/follow`
                      );
                      setFollowing(response.data.following);

                      if (response.data.following) {
                        setFollowing(following);
                      } else {
                        setFollowing(!following);
                      }
                    }}
                  >
                    {!following ? <div>Follow</div> : <div>Following</div>}
                  </div>

                  <div className="bg-neutral-700 rounded w-50 flex justify-center">
                    Messsage
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="flex gap-5 justify-center pt-6">
                    <Button
                      onClick={handleLogout}
                      className="bg-neutral-700 rounded w-30 font-bold flex justify-center opacity-50"
                      variant={"ghost"}
                    >
                      Log out
                    </Button>
                    <div className="bg-neutral-700 rounded w-80 flex justify-center">
                      <Button
                        onClick={handleSubmit}
                        className="font-bold"
                        variant={"ghost"}
                        disabled={uploading || !selectedFile}
                      >
                        {uploading ? "Uploading..." : "Edit"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer h-10 w-10"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600"></span>
                    </label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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

