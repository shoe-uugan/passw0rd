// "use client"
// import { CardDescription } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Bookmark, HatGlasses, Heart, Send, SendHorizonal, SendIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useContext, useEffect, useState } from "react";
// import { toast } from "sonner";
// import { UserContext } from "../../../../providers/UserProvider";

// type User = {
//   username: string;
// };        

// type Post = {
//   createdBy: User;
//   _id: string;
//   imageUrl: string;
//   description: string;
// };

//   const CommentStuff = ({ params }: { params: { id: string } }) => {
//         const [data, setData] = useState(null);
//         const [description, setDescription] = useState("");
//         const router = useRouter();
//         const { token } = useContext(UserContext);
//     // const Comment = async({ params }: { params: { id: string } })=>{
    
//       // const response = await fetch("http://localhost:5500/posts/" + id);
//       // const post: Post = await response.json();
//       // console.log(post._id);


//   useEffect(() => {
//     const Uhuh = async () => {
//       const { id } = await params;
//       try {
//         const response = await fetch(`http://localhost:5500/posts/` + id);
//         const post: Post = await response.json();
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     Uhuh()
//   }, [params]);

//         const handleSubmit = async () => {
//           const response = await fetch("http://localhost:5500/comments", {
//             method: "POST",
//             body: JSON.stringify({ description, postId: params.id }),
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: "BEARER " + token,
//             },
//           });

//           const data = await response.json();
//           if (response.status !== 200) {
//             toast.error(data.message);
//             return;
//           }

//           toast.success("Post created successfully!");
//           router.push("/");
//         };

    
//     return (
//       <div className="flex p-10 justify-center">
//         <div className="flex flex-col">
//           <div className="text-[22px] "> {post.createdBy.username}</div>
//           <div className="text-[22px] pb-2">{post.description}</div>
//           <img
//             src={post.imageUrl}
//             className="w-220 object-cover object-center"
//           />

//           <div className="flex flex-col pl-5">
//             <div className="h-5"></div>
//             <div className="flex flex-row gap-10">
//               <Heart />
//               <Send />
//               <Bookmark />
//             </div>
//           </div>
//           <div className="pt-5 relative">
//             <Textarea
//               placeholder="What do you think of this?"

//             />
//             <SendHorizonal className="absolute right-5 bottom-5" />
//           </div>
//         </div>
//         <button onClick={handleSubmit}>aadcwdcde</button>
//       </div>
      
//     );
    
//   };
  
//   // return Comment
 
// export default CommentStuff;
