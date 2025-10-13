import React, { Suspense } from "react";

export default function App({ children }: { children: any }) {
  return (
    <html>
      <head>
        <title>Server Components</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <h1>Hello world</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
