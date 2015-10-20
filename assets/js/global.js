var requestData = {};
$(document).ready(function() {
  $('.stand-by').hide();
  $(document).on('click', 'input[type=text]', function() {
    this.select();
  });
  $('button').click(function(evt) {
    evt.preventDefault();
  });
  $('form[name="search"] button').click(function() {
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
      'limit': 10
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
        if (filterDuplicates(items[i], results.suggestions)) {
          continue;
        }
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
      return results;
    },
    onSelect: function(suggestion) {
      requestData = suggestion.data;
      $('.stand-by').show();
      $.ajax({
        url: '/search',
        type: 'GET',
        data: requestData,
        success: function(res) {
          var currentLyrics = escapeJSON(res);
          $('.stand-by').hide();
          $('.lyrics').html("<h2>'" + suggestion.data.songName + "' - " + suggestion.data.artistName);
          $('.lyrics').append(currentLyrics);
          var isPlaying = false;
        },
        error: function(res) {
          $('.stand-by').hide();
          console.log('There was an error');
          $('.lyrics').append("We couldn\'t fetch any lyrics for this song. Sorry about that.");
        }
      });
      $('.album-img').attr({
        src: suggestion.data.albumImg,
        alt: suggestion.data.albumName
      });
      $('#player').attr({
        src: suggestion.data.previewUrl
      });
    }
  });
});

// escape newlines for display in browser
function escapeJSON(json) {
  return json.replace(/\n/g, "<br>");
}

// delete duplicates from display array
function filterDuplicates(item, array) {
  for (var i = 0; i < array.length; i++) {
    // console.log("item: ", item, "array: ", array)
    if (array[i].data.songName === item.name &&
      array[i].data.artistName === item.artists[0].name) {
      // console.log("there was a duplicate!");
      return true;
    }
  }
}
