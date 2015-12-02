(function () {
  "use strict";
  var request = function (url, form) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      url = url + "?" + [].slice.call(form.elements).map(function (element) {
        return escape(element.name) + "=" + escape(element.value);
      }).join("&");
      xhr.open("get", url);
      xhr.send();

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.response));
        } else {
          reject(this.statusText);
        }
      };
      xhr.onerror = function () {
        reject(this.statusText);
      };
    });
  };

  var livesearch = function(form, callback) {
    var searchField = form.querySelector("input[type=text]");
    var timeout;

    searchField.addEventListener("input", function (e) {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (e.target.value.length > 3) {
        timeout = setTimeout(function () {
          request(form.action, form)
            .then(callback);
        }, 500);
      }
    });
  };

  window.livesearch = livesearch;
}());
