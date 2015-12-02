(function () {
  "use strict";
  livesearch(document.getElementById("form"), function (data) {
    var results = document.getElementById("results");

    results.innerHTML = "";

    data.photos.photo.forEach(function (photo) {
      var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_t.jpg";

      var li = document.createElement("li");
      li.innerHTML = "<img src=\"" + url + "\" alt=\"" + photo.title + "\">";
      results.appendChild(li);
    });
  });
}());
