"use client";

import { useEffect, useState } from "react";


type Post = {
  _id: string;
  imageUrl: string;
  description: string;
};


const Commentsection = () => {
      const [posts, setPosts] = useState<Post[]>([]);
   useEffect(() => {
        fetch("http://localhost:5500/posts")
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
          });
      }, []);
      
  return (
    <div>
     
    </div>
  );
};

export default Commentsection