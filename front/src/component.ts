export default (text = "Hello World") => {
  const element = document.createElement("div");
  element.className = "fa fa-hand-spock-o fa-ig";
  element.innerHTML = text;
  return element;
};
