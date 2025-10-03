import React, { Suspense } from "react";

export default function App() {
  return (
    <html>
      <head>
        <title>Server Components</title>
      </head>
      <body>
        <div id="root">
          <header>
            <h1>Hello world</h1>
          </header>          
          <footer>I'm a footer</footer>
        </div>
      </body>
    </html>
  );
}
