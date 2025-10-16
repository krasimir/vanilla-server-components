import React from "react";
import { hydrateRoot } from "react-dom/client";
import Comments from "./components/blog/Comments.js";
window.Comments = Comments;
window.renderPosts = function(posts) {
  const container = document.getElementById("posts");
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div class="comments" id="comments-${post.id}">Loading comments ...</div>
    `;
    container.innerHTML = "";
    setTimeout(() => {
      container.appendChild(postEl);
    }, 0);
  });
};
window.renderComments = function(comments) {
  comments.forEach((comment) => {
    const commentsContainer = document.getElementById(`comments-${comment.postId}`);
    if (commentsContainer) {
      const commentEl = document.createElement("div");
      commentEl.innerHTML = `
        <p>${comment.content}</p>
      `;
      commentsContainer.innerHTML = "";
      setTimeout(() => {
        commentsContainer.appendChild(commentEl);
      }, 0);
    }
  });
};
window.promiseResolved = function(id, data) {
  const root = document.querySelector(`[data-island="${id}"]`);
  hydrateRoot(root, React.createElement(
    Comments,
    { commentsPromise: Promise.resolve(data) }
  ));
};
