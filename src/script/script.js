$(document).ready(function () {
  $('.js-menu__btn').on('click', function () {
    if ($('.js-header').hasClass('active')) {
      $('.js-header').removeClass('active');
    } else {
      $('.js-header').addClass('active');
    }
  })
});

$(function () {
  $('.news__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    appendDots: false,
    arrows: false,
  });

  $('.news__mobile-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    appendDots: false,
    arrows: false,
  });

  $('.catalog__slider').slick({
    dots: true,
    appendDots: $('.catalog__slider'),
    prevArrow: $('.catalog__arrow_prev-arrow'),
    nextArrow: $('.catalog__arrow_next-arrow'),
  });

  $('.reviews__slider').slick({
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    appendDots: false,
    arrows: false,
  });
});

gapi.load("client", loadClient);

function loadClient() {
  gapi.client.setApiKey("AIzaSyBPZSm2ZPEgzuqApm9s5ZhextpFOwvHzI8");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () {
      console.log("GAPI client loaded for API");
      loadVideo();
    },
      function (err) { console.error("Error loading GAPI client for API", err); });
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const videoList = document.getElementById('videoList');
let pageToken = '';

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchVideo();
});

function paginate(e, obj) {
  e.preventDefault();
  pageToken = obj.getAttribute('data-id');
  searchVideo();
}

function searchVideo() {
  const searchString = searchInput.value;

  let arr_search = {
    "part": 'snippet',
    "type": 'video',
    "order": 'date',
    "channelId": 'UCkJ0iGUSIgdcQ7YiJjalX7g',
    "maxResults": 5,
    "q": searchString
  };

  if (pageToken != '') {
    arr_search.pageToken = pageToken;
  }

  return gapi.client.youtube.search.list(arr_search)
    .then(function (response) {

      const listItems = response.result.items;

      if (listItems) {
        let output = '<h4>Вот, что у нас есть:</h4><ul>';

        listItems.forEach(item => {
          const videoId = item.id.videoId;
          const videoTitle = item.snippet.title;
          output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/mqdefault.jpg" /></a><p>${videoTitle}</p></li>
                `;
        });
        output += '</ul>';

        if (response.result.prevPageToken) {
          output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
        }

        if (response.result.nextPageToken) {
          output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
        }

        videoList.innerHTML = output;
      }
    },
      function (err) { console.error("Execute error", err); });
}

function paginate(e, obj) {
  e.preventDefault();
  pageToken = obj.getAttribute('data-id');
  loadVideo();
}

function loadVideo() {

  let arr_search = {
    "part": 'snippet',
    "type": 'video',
    "order": 'date',
    "channelId": 'UCkJ0iGUSIgdcQ7YiJjalX7g',
    "maxResults": 3
  };
  console.log(arr_search)

  if (pageToken != '') {
    arr_search.pageToken = pageToken;
  }

  return gapi.client.youtube.search.list(arr_search)
    .then(function (response) {
      const listItems = response.result.items;
      console.log(listItems)
      if (listItems) {
        let output = '<h4>Вот, что у нас есть:</h4><ul>';

        listItems.forEach(item => {
          const videoId = item.id.videoId;
          const videoTitle = item.snippet.title;
          output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/mqdefault.jpg" /></a><p>${videoTitle}</p></li>
                `;
        });
        output += '</ul>';

        if (response.result.prevPageToken) {
          output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
        }

        if (response.result.nextPageToken) {
          output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
        }

        videoList.innerHTML = output;
      }
    },
      function (err) { console.error("Execute error", err); });
}
