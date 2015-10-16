var requestData = {};
$(document).ready(function() {
  $(document).on('click', 'input[type=text]', function() {
    this.select();
  });
  $('form[name="search"] button').click(function(evt) {
    evt.preventDefault();
    $.ajax({
      url: '/search',
      type: 'GET',
      data: requestData,
      success: function(res) {
        $('.lyrics').append(escapeJSON(res));
        console.log("response: ");
        console.log(res);
      },
      error: function(res) {
        console.log('There was an error');
      }
    });
  });
  $('#song-search').autocomplete({
    serviceUrl: 'https://api.spotify.com/v1/search',
    type: 'GET',
    dataType: 'json',
    paramName: 'q',
    params: {
      type: 'track',
      'limit': 5
    },
    deferRequestBy: 300,
    onSearchStart: function(query) {
      return encodeURIComponent(query);
    },
    transformResult: function(response, originalQuery) {
      var items = response.tracks.items;
      var results = {};
      results.suggestions = [];
      for (var i = 0; i < items.length; i++) {
        var gans = "'";
        results.suggestions.push({
          value: gans.concat(items[i].name, "'", " by ", items[i].artists[0].name),
          data: {
            songName: items[i].name,
            songId: items[i].id,
            artistName: items[i].artists[0].name,
            artistId: items[i].artists[0].id,
            albumImg: items[i].album.images[0].url,
            albumName: items[i].album.name,
            previewUrl: items[i].preview_url
          }
        });
      }
      console.log(results);
      return results;
    },
    onSelect: function(suggestion) {
      requestData = suggestion.data;
      $.ajax({
        url: '/search',
        type: 'GET',
        data: requestData,
        success: function(res) {
          var currentLyrics = escapeJSON(res);
          $('.lyrics').append(currentLyrics);
        },
        error: function(res) {
          console.log('There was an error');
        }
      });
      $('.album-img').attr({
        src: suggestion.data.albumImg,
        alt: suggestion.data.albumName
      });
      $('#player').attr({
        src: suggestion.data.previewUrl
      });
      $('.lyrics').html("<h2>'" + suggestion.data.songName + "' - " + suggestion.data.artistName);
    }
  });
});

// escape newlines for display in browser
function escapeJSON(json) {
  return json.replace(/\n/g, "<br>");
}
