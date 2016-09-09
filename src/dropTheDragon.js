const dropTheDragon = {
  document: typeof window !== 'undefined' ? window.document : null,

  setDocument(document) {
    this.document = document;
  },

  get(selector) {
    return this.document.querySelectorAll(selector)
  },

  remove(selector) {
    const styles = this.get(selector);
    if (styles.length > 0) styles[0].parentElement.removeChild(styles[0]);
  },

  addCSS(css, id) {
    var head = this.document.head || this.document.getElementsByTagName('head')[0],
      style = this.document.createElement('style');

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(this.document.createTextNode(css));
    }

    style.id = id;

    head.appendChild(style);
  },

  after(element, html) {
    element.insertAdjacentHTML('afterend', html);
  },

  ajax(configuration) {
    const httpRequest = new XMLHttpRequest();

    if (!httpRequest) return false;

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          configuration.success(httpRequest.responseText);
        } else {
          configuration.error(httpRequest.status);
        }
      }
    };

    httpRequest.open(configuration.method, configuration.url);
    httpRequest.send();
  }
};

if (typeof module !== 'undefined') {
  module.exports = dropTheDragon;
}