import React, { use } from "react";
import { getComments, getPosts } from "../services/DB.js";
function Posts() {
  const posts = use(getPosts(10));
  const comments = use(getComments(10));
  return posts.map((post) => /* @__PURE__ */ React.createElement("article", { key: post.id }, /* @__PURE__ */ React.createElement("h2", null, post.title), /* @__PURE__ */ React.createElement("p", null, post.content), /* @__PURE__ */ React.createElement("div", null, comments.filter((comment) => comment.postId === post.id).map((comment) => /* @__PURE__ */ React.createElement("div", { key: comment.id, style: { marginBottom: "0.5em" } }, comment.content)))));
}
export {
  Posts as default
};
