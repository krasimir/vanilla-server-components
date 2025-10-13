window.renderPosts = function(posts) {
  const container = document.getElementById("posts");
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div id="comments-${post.id}">
    `;
    container.appendChild(postEl);
  });
};
window.renderComments = function(posts) {
};
