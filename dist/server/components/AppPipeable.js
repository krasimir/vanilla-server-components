import React from "react";
import { getComments, getPosts } from "../services/DB.js";
async function AppPipeable() {
  const posts = await getPosts();
  const comments = await getComments();
  return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("title", null, "Pipeable stream"), /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: "/styles.css" })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Hello world"), posts.map((post) => /* @__PURE__ */ React.createElement("article", { key: post.id }, /* @__PURE__ */ React.createElement("h2", null, post.title), /* @__PURE__ */ React.createElement("p", null, post.content), /* @__PURE__ */ React.createElement("div", null, comments.filter((comment) => comment.postId === post.id).map((comment) => /* @__PURE__ */ React.createElement("div", { key: comment.id, style: { marginBottom: "0.5em" } }, comment.content))))))));
}
export {
  AppPipeable as default
};
