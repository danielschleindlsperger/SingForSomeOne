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
      if (!error && response.statusCode == 200){
        return res.send(body.lyric);
      }else{
        return res.send("An Error occured and we couldn't retrieve any lyrics");
        console.log('Http error: ' + error + '\n' + 'Api response error: ' + body.err);
      }
    }).on('error', function(err) {
      console.log(err);
      return res.send("Can't find lyrics");
    });
  }
};
module.exports = SongController;
