import React, { use, Suspense, useContext } from "react";
import { getCommentsByPostId, getPosts } from "../services/DB.js";
import Comments from "./blog/Comments.js";
import { PromisesContext } from "./contexts/Promises.js";
async function AppWithClient({ Promises }) {
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Suspense with client"), /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: "/styles.css" })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(PromisesContext.Provider, { value: Promises }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Hello world"), /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement("h2", null, "Loading posts...") }, /* @__PURE__ */ React.createElement(Posts, null))))));
}
function Posts() {
  const posts = use(getPosts(0.1));
  return posts.map((post) => /* @__PURE__ */ React.createElement("article", { key: post.id }, /* @__PURE__ */ React.createElement("h2", null, post.title), /* @__PURE__ */ React.createElement("p", null, post.content), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement("p", null, "Loading comments...") }, /* @__PURE__ */ React.createElement(CommentsWrapper, { commentsPromise: getCommentsByPostId(post.id, 0.1) })))));
}
let id = 0;
const getId = () => "SC" + ++id;
function CommentsWrapper(props) {
  const Promises = useContext(PromisesContext);
  const id2 = getId();
  for (const key in props) {
    const value = props[key];
    if (isPromise(value)) {
      Promises.add(id2, value);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { "data-island": id2 }, /* @__PURE__ */ React.createElement(Comments, { ...props }));
}
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
export {
  AppWithClient as default
};
