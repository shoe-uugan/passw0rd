
import { Post } from "./types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { toast } from "sonner";
import { useUser } from "../app/providers/UserProvider";
import { useState, useEffect } from "react";
import { useAxios } from "../app/hooks/useAxios";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

dayjs.extend(relativeTime);

export const PostCard = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  // const [commentCount, setCommentCount] = useState(post.comments.length);
  const [totalComments, setTotalComments] = useState(3);

  const axios = useAxios();

  const [text, setText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userId = user._id;
      setIsLiked(post.likes.some((like) => like.createdBy._id === userId));
    }
  }, [user]);

  const handleSubmitComment = async () => {
    const response = await axios.post(`/posts/${post._id}/comments`, { text });
    if (response.status === 200) {
      setText("");
      setComments([...comments, response.data]);
    } else {
      toast.error("error");
    }
  };

  return (
    <div key={post._id} className="mb-4 border-b py-4">
      <div className="flex justify-between">
        <Link href={`/${post.createdBy.username}`}>
          <div className="font-bold text-[17px] pb-2">
            {post.createdBy.username}
          </div>
        </Link>
        <div className="text-[12px]">{dayjs(post.createdAt).fromNow()}</div>
      </div>
      <img src={post.imageUrl} alt="" className="w-200 pb-2" />
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-1">
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
        </div>
        <div className="flex flex-row gap-1">
            <Link href={`/comments/${post._id}`}>
              
              <MessageCircle />
              
            </Link>
          {/* <MessageCircle className="flex " />{" "} */}
          {/* <div className="text-[15px]">{commentCount} comments</div> */}
        </div>
      </div>
      {/* <hr /> */}
      <div>
        <Link href={`/${post.createdBy.username}`}>
          <b className="text-[17px]">{post.createdBy.username}</b>
        </Link>
        <b className="text-[17px] font-[500] opacity-70">
          {" "}
          {post.description}{" "}
        </b>
      </div>
      {comments.slice(0, totalComments).map((comment) => (
        <div key={comment._id}>
          <b className="text-[12px]">{comment.createdBy.username}: </b>
          <b className="text-[12px]">{comment.text} </b>
        </div>
      ))}
      {comments.length > 3 && (
        <div
          onClick={() => {
            setTotalComments(100);
          }}
          className="hover:underline cursor-pointer"
        >
          View all comments
        </div>
      )}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          className="w-full resize-none text-[15px] pl-2"
          rows={1}
        />
        {text.length > 0 && (
          <div
            onClick={handleSubmitComment}
            className="absolute hover:underline cursor-pointer right-1 top-3 font-bold text-[12px] pb-2"
          >
            Post
          </div>
        )}
      </div>
    </div>
  );
};
