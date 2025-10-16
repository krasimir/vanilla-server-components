window.renderSC = function(id) {
  const root = document.querySelector(`[data-island="${id}"]`);
  const propsStr = document.querySelector(`[data-props="${id}"]`).innerHTML;
  const props = JSON.parse(propsStr);
  const normalizedProps = {};
  for (const key in props) {
    const value = props[key];
    if (value && value.toString().match(/^\$Promise:/)) {
      normalizedProps[key] = new Promise((resolve) => {
      });
    }
  }
  hydrateRoot(root, React.createElement(Comments, normalizedProps));
};
window.promiseResolved = function(id, data) {
  console.log("promiseResolved", id, data);
};
