
import { CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, HatGlasses, Heart, Send, SendHorizonal, SendIcon } from "lucide-react";
import { toast } from "sonner";

type User = {
  username: string;
};

type Post = {
  createdBy: User;
  _id: string;
  imageUrl: string;
  description: string;
};
  const CommentStuff = async ({ params }: { params: { id: string } }) => {

    const { id } = params;
    const response = await fetch("http://localhost:5500/posts/" + id);
    const post: Post = await response.json();
    console.log(post._id);

const PostComment = ()=>{

}
    return (
      <div className="flex p-10 justify-center">
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
              <Heart />
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
      </div>
    );
  };

export default CommentStuff;
