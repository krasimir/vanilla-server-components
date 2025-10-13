import React, { startTransition, Suspense } from "react";
import Posts from "./Posts.js";

export default async function AppSuspense() {
  return (
    <html>
      <head>
        <title>Suspense</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <h1>Hello world</h1>
          <Suspense fallback={<h2>Loading posts...</h2>}>
            <Posts />
          </Suspense>
        </main>
      </body>
    </html>
  );
}
