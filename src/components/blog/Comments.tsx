"use client";
import React, { use, useState } from "react";
import { getCommentsByPostId } from "../../services/DB.js";

export default function Comments({ postId }: { postId: number }) {
  const comments = use(getCommentsByPostId(postId, 0.2));
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return <button onClick={() => setVisible(true)}>Show Comments</button>;
  }
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
