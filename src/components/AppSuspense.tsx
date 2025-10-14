import React, { use, Suspense } from "react";
import { getPosts, getCommentsByPostId } from "../services/DB.js";

export default async function AppSuspense() {
  return (
    <html>
      <head>
        <title>Suspense</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <h1>Hello world</h1>
          <Suspense fallback={<h2>Loading posts...</h2>}>
            <Posts />
          </Suspense>
        </main>
      </body>
    </html>
  );
}

function Posts() {
  const posts = use(getPosts(5));
  return posts.map((post) => (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        <Suspense fallback={<p>Loading comments...</p>}>
          <Comments postId={post.id} />
        </Suspense>
      </div>
    </article>
  ));
}

function Comments({ postId }: { postId: number }) {
  const comments = use(getCommentsByPostId(postId));
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
