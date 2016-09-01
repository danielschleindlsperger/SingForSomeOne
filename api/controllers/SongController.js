var SongController = {
  search: function(req, res) {
    var request = require('request'); // https://github.com/request/request
    var artist = encodeURIComponent(req.query['artistName']);
    var song = encodeURIComponent(req.query['songName']);
    var url = "https://lyric-api.herokuapp.com/api/find/" + artist + "/" + song;
    request({
      url: url,
      json: true,
      followRedirect: true,
      maxRedirects: 10
    }, function(error, response, body) {
      if (!error && response.statusCode == 200 && body.err !== "not found") {
        // console.log("response sent. contains: ", body.lyric);
        return res.send(body.lyric);
      } else {
        console.log('Http error: ' + error + '\n' + 'Api response error: ' + body.err);
        return res.notFound("An Error occurred and we couldn't retrieve any lyrics");
      }
    }).on('error', function(err) {
      console.log(err);
      return res.send("Can't find lyrics");
    });
  },
  advancedSearch: function(req, res) {
    return res.send('Feature coming soon!');
  }
};
module.exports = SongController;
