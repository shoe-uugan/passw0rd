"use client"
import { CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bookmark, HatGlasses, Heart, Send, SendHorizonal, SendIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Post } from "@/components/types";
import { User } from "@/components/types";
import { useAxios } from "@/app/hooks/useAxios";
import { useUser } from "@/app/providers/UserProvider";

  const CommentStuff = ({ params }: { params: { id: string } }) => {

 const [posts, setPosts] = useState<Post[]>([]);
    const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

    const { id } = params;

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPosts(res.data);
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
const post: Post = posts[0]
    
 const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const axios = useAxios();

  const [text, setText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const { user } = useUser();
 


    return (
        
      <div className="flex p-10 justify-center">
     

             
         <Link href={"/"}>
                    <div className="p-2">
                      {" "}
                      <ArrowLeft></ArrowLeft>{" "}
                    </div>
                  </Link>
        <div className="flex flex-col">
          <div className="text-[22px] "> {post.createdBy.username}</div>
          <div className="text-[22px] pb-2">{post.description}</div>
          <img
            src={post.imageUrl}
            className="w-220 object-cover object-center"
          />

          <div className="flex flex-col pl-5">
            <div className="h-5"></div>
            <div className="flex flex-row gap-10">
                <div className="flex ">
            <div
              className="hover:opacity-60 cursor-pointer"
              onClick={async () => {
                const response = await axios.post(`/posts/${post._id}/like`);
                setIsLiked(response.data.isLiked);

                if (response.data.isLiked) {
                  setLikeCount(likeCount + 1);
                } else {
                  setLikeCount(likeCount - 1);
                }
              }}
            >
              {isLiked ? <Heart fill="red" stroke="red" /> : <Heart />}
            </div>
          </div>
          <div className="text-[15px]">{likeCount} likes</div>
              <Send />
              <Bookmark />
            </div>
          </div>
          <div className="pt-5 relative">
            <Textarea
              placeholder="What do you think of this?"
  />
            <SendHorizonal className="absolute right-5 bottom-5" />
          </div>
        </div>
          {comments.slice().map((comment) => (
        <div key={comment._id}>
          <b className="text-[12px]">{comment.createdBy.username}: </b>
          <b className="text-[12px]">{comment.text} </b>
        </div>
      ))}
      
        <div
          className="hover:underline cursor-pointer"
        >
          View all comments
        </div>
      

             
          </div>

            );
  };
  export default CommentStuff;