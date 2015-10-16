$(document).ready(function() {
  var isPlaying = false;
  var player = document.getElementById('player');
  var slider = document.getElementById('volume');
  var volumeMax = slider.max;

  // Player play/pause toggle on button click
  $('.play-pause').click(function() {
    console.log("click");
    if (isPlaying === false) {
      player.play();
    } else {
      player.pause();
    }
    isPlaying = !isPlaying;
  });

  // Volume change with slider
  $(slider).on("input change", function() {
    player.volume = slider.value / volumeMax;
  });
});
