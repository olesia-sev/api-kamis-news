$(document).ready(function () {
  $.getJSON('http://test.kamis.ru/api/news', function (data) {
    var items = [];

    $.each(data, function (key, itemData) {
      items.push("<div id='card_" + key + "' class= 'news col-md-6 col-lg-4 col-xl-3'>"
        + "<a href=" + itemData.url + " class='news__item'>"
        + "<div class='news__pic'>"
        + '<img src="' + itemData.image + '" class="news__img">'
        + "</div>"
        + "<div class='news__title'>"
        + "<h2 class='news__title--text'>" + itemData.title + "</h2>"
        + "</div>"
        + "<div class='news__preview'>"
        + "<p class='news__preview--text'>" + itemData.preview + "</p>"
        + "</div>"
        + "</a>"
        + "</div>");
    });

    $("<div/>", {
      "class": "row",
      html: items.join("")
    }).appendTo(".container-fluid");
  });
});
