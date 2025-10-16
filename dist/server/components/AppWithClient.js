import React, { use, Suspense } from "react";
import { getPosts } from "../services/DB.js";
import Comments from "./blog/Comments.js";
async function AppWithClient() {
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Suspense with client"), /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: "/styles.css" })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Hello world"), /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement("h2", null, "Loading posts...") }, /* @__PURE__ */ React.createElement(Posts, null)))));
}
function Posts() {
  const posts = use(getPosts(0.2));
  return posts.map((post) => /* @__PURE__ */ React.createElement("article", { key: post.id }, /* @__PURE__ */ React.createElement("h2", null, post.title), /* @__PURE__ */ React.createElement("p", null, post.content), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement("p", null, "Loading comments...") }, /* @__PURE__ */ React.createElement(Comments, { postId: post.id })))));
}
export {
  AppWithClient as default
};
