(() => {
  // src/client.tsx
  console.log("client");
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
})();
//# sourceMappingURL=bundle.js.map
