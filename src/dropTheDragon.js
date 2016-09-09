'use strict';

const dropTheDragon = {
  document: typeof window !== 'undefined' ? window.document : null,

  setDocument(document) {
    this.document = document;
  },

  // DOM

  get(selector) {
    return this.document.querySelectorAll(selector);
  },

  forEach(selector, callback, scope) {
    const array = this.get(selector);

    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  },

  parent(selector, tagName) {
    let el = this.get(selector)[0];
    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == tagName) {
        return el;
      }
    }

    return null;
  },

  remove(selector) {
    const styles = this.get(selector);
    if (styles.length > 0) styles[0].parentElement.removeChild(styles[0]);
  },

  // HTML

  after(element, html) {
    element.insertAdjacentHTML('afterend', html);
  },

  // CLASS

  matchClass(className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)');
  },

  hasClass(el, className) {
    return !!el.className.match(this.matchClass(className));
  },

  addClass(el, className) {
    if (!this.hasClass(el, className)) {
      el.className += className;
    }
  },

  removeClass(el, className) {
    if (this.hasClass(el, className)) {
      var reg = this.matchClass(className);
      el.className = el.className.replace(reg, ' ');
    }
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

  // XMLHttpRequest

  jsonToParams(json) {
    return Object.keys(json).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
    }).join('&');
  },

  ajax(configuration) {
    const httpRequest = new XMLHttpRequest();

    if (!httpRequest) return false;

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          let data = httpRequest.responseText;

          if (data.startsWith('{')) {
            data = JSON.parse(data);
          }

          configuration.success(data);
        } else {
          configuration.error(httpRequest.status);
        }
      }
    };

    httpRequest.open(configuration.method, configuration.url);

    if (configuration.data) {
      httpRequest.send(this.jsonToParams(configuration.data));
    } else {
      httpRequest.send();
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = dropTheDragon;
}