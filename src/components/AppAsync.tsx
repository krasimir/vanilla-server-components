import React, { startTransition } from "react";
import { getComments, getPosts } from "../services/DB.js";

export default async function AppAsync() {
  const posts = await getPosts();
  const comments = await getComments();
  return (
    <html>
      <head>
        <title>Async component</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <h1>Hello world</h1>
          {posts.map((post) => (
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
          ))}
        </main>
      </body>
    </html>
  );
}
