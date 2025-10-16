import React, { use, Suspense } from "react";
import { getPosts } from "../services/DB.js";

import Comments from './blog/Comments.js';

export default async function AppWithClient() {
  return (
    <html>
      <head>
        <title>Suspense with client</title>
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
  const posts = use(getPosts(0.2));
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


