let id = 0;
const getId = () => "SC" + ++id;

function CommentsWrapper(props) {
  const Promises = useContext(PromisesContext);
  const id = getId();
  for (const key in props) {
    const value = props[key];
    if (isPromise(value)) {
      Promises.add(id, value);
    }
  }
  return (
    <div data-island={id}>
      <Comments {...props} />
    </div>
  );
}
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
