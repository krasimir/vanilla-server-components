"use client";
import React, { use, useState } from "react";
import { getCommentsByPostId } from "../../services/DB.js";
function Comments({ postId }) {
  const comments = use(getCommentsByPostId(postId, 0.2));
  const [visible, setVisible] = useState(false);
  if (!visible) {
    return /* @__PURE__ */ React.createElement("button", { onClick: () => setVisible(true) }, "Show Comments");
  }
  return /* @__PURE__ */ React.createElement("ul", null, comments.map((comment) => /* @__PURE__ */ React.createElement("li", { key: comment.id }, /* @__PURE__ */ React.createElement("p", null, comment.content))));
}
export {
  Comments as default
};
