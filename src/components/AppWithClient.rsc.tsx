import React, { use, Suspense, useContext } from "react";
import { getCommentsByPostId, getPosts } from "../services/DB.js";
import Comments from './blog/Comments.js';
import { PromisesContext } from "./contexts/Promises.js";
export default async function AppWithClient({ Promises }) {
    return (<html>
      <head>
        <title>Suspense with client</title>
        <link rel="stylesheet" href="/styles.css"/>
      </head>
      <body>
        <PromisesContext.Provider value={Promises}>
          <main>
            <h1>Hello world</h1>
            <Suspense fallback={<h2>Loading posts...</h2>}>
              <Posts/>
            </Suspense>
          </main>
        </PromisesContext.Provider>
      </body>
    </html>);
}
function Posts() {
    const posts = use(getPosts(0.1));
    return posts.map((post)=>(<article key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        <Suspense fallback={<p>Loading comments...</p>}>
          <CommentsWrapper commentsPromise={getCommentsByPostId(post.id, 0.1)}/>
        </Suspense>
      </div>
    </article>));
}

let id = 0;
const getId = () => "SC" + ++id;

function CommentsWrapper(props) {
  const Promises = useContext(PromisesContext);
  const id = getId();
  for (const key in props) {
    const value = props[key];
    if (isPromise(value)) {
      Promises.add(id, value);
    }
  }
  return (
    <div data-island={id}>
      <Comments {...props} />
    </div>
  );
}
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
