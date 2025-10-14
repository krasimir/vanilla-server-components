import React, { use } from "react";
function Posts() {
  const posts = use(getPosts(5));
  const comments = use(getComments(5));
  return posts.map((post) => /* @__PURE__ */ React.createElement("article", { key: post.id }, /* @__PURE__ */ React.createElement("h2", null, post.title), /* @__PURE__ */ React.createElement("p", null, post.content), /* @__PURE__ */ React.createElement("div", null, comments.filter((comment) => comment.postId === post.id).map((comment) => /* @__PURE__ */ React.createElement("div", { key: comment.id, style: { marginBottom: "0.5em" } }, comment.content)))));
}
export {
  Posts as default
};
