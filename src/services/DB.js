const DEFAULT_DELAY = 1;

export async function getPosts(delay) {
  await new Promise((resolve) => setTimeout(resolve, (delay || DEFAULT_DELAY) * 1000));
  return [
    { id: 1, title: "First Post", content: "This is the first post." },
    { id: 2, title: "Second Post", content: "This is the second post." },
    { id: 3, title: "Third Post", content: "This is the third post." }
  ];
}

export async function getComments(delay) {
  await new Promise((resolve) => setTimeout(resolve, (delay || DEFAULT_DELAY) * 1000));
  return [
    { id: 1, postId: 1, content: "Great post!" },
    { id: 2, postId: 1, content: "Very informative." },
    { id: 3, postId: 2, content: "Thanks for sharing." }
  ];
}
export async function getCommentsByPostId(postId, delay) {
  await new Promise((resolve) => setTimeout(resolve, (delay || DEFAULT_DELAY) * 1000));
  const allComments = await getComments(0); // No delay for internal call
  return allComments.filter((comment) => comment.postId === postId);
}

export function getContent(posts, comments) {
  return posts
    .map((post) => {
      const postComments = comments.filter((comment) => comment.postId === post.id);
      return `<div class="post">
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <h3>Comments:</h3>
      <ul>
        ${postComments.map((comment) => `<li>${comment.content}</li>`).join("")}
      </ul>
    </div>`;
    })
    .join("");
}