"use client";

import React, { use, useState } from "react";

type CommentsProps = {
  commentsPromise: Promise<Array<{ id: number; content: string }>>;
}

export default function Comments({ commentsPromise }: CommentsProps) {
  const comments = use(commentsPromise);
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
