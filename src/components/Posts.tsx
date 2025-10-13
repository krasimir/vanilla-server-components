import React, { use } from "react";
import { getComments, getPosts } from "../services/DB.js";

export default function Posts() {
  const posts = use(getPosts(10));
  const comments = use(getComments(10));
  return posts.map((post) => (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        {comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => (
            <div key={comment.id} style={{ marginBottom: "0.5em" }}>
              {comment.content}
            </div>
          ))}
      </div>
    </article>
  ));
}
