# vanilla-server-components

An experiment of building React server components (RSC) without framework

```
> npm i
> npm run dev
```

The "magic" of splitting the code into server and client happens in `scripts/magic.js`. Run it with `npm run magic`.

---

The example that shows how to pass a live promise from server to client is available at http://localhost:8087/react-suspense-with-client but there are some other examples. Here's the full list:

* http://localhost:8087 - just regular server rendering with no async work
* http://localhost:8087/http-streaming - HTTP streaming example without a framework
* http://localhost:8087/react-rendertostring - example with React's `renderToString`
* http://localhost:8087/react-rendertostring-async-comp - Same as above except that the async work is placed inside the react component. It basically proves that `renderToString` DOES NOT support async components.
* http://localhost:8087/react-pipeable-stream - example with React's `renderToPipeableStream`
* http://localhost:8087/react-suspense - same as above but `Suspense` and `use` are in the game
* http://localhost:8087/react-suspense-with-client - final example that handles a promise passed from server to a client component. As I mentioned above - `npm run magic` needs to be fired before running `npm run dev`.