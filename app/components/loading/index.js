let localDocument = document.currentScript.ownerDocument;
let template = localDocument.getElementById('tmpl-loader');
let MessageProto = Object.create(HTMLElement.prototype);

MessageProto.createdCallback = function() { // создание элемента
  let root = this.createShadowRoot();
  root.appendChild(template.content.cloneNode(true));
};

document.registerElement('loading-screen', {
  prototype: MessageProto
});

window.onload = function ready() {
  showPage();
};

function showPage() {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('loader_wrapper').style.display = 'block';
};
