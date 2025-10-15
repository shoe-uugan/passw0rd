"use client";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { toast } from "sonner";

export function CommentUtility() {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { token } = useContext(UserContext);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5500/comments", {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "BEARER " + token,
      },
    });

    const data = await response.json();
    if (response.status !== 200) {
      toast.error(data.message);
      return;
    }

    toast.success("Post created successfully!");
    router.push("/");
  };

  return <div></div>;
}
