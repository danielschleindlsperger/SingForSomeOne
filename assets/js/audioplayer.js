var isPlaying = false;
$(document).ready(function() {
  var player = document.getElementById('player');
  var slider = document.getElementById('volume');

  // Player play/pause toggle on button click
  $('.play-pause').click(function() {
    if (isPlaying === false) {
      player.play();
    } else {
      player.pause();
    }
    isPlaying = !isPlaying;
  });

  // Volume change with slider
  $(slider).on("input change", function() {
    player.volume = slider.value / slider.max;
  });
});
