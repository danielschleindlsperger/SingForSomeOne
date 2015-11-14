$(document).ready(function() {
  var player = document.getElementById('player');
  var volumeSlider = document.getElementById('volume');

  // Player play/pause toggle on button click
  $('.play-pause').click(function() {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  });

  // Initialize volume when audio is ready to play
  player.addEventListener('canplay', function() {
    player.volume = volumeSlider.value / volumeSlider.max;
  }, false);

  // Volume change with slider
  $(volumeSlider).on("input change", function() {
    player.volume = volumeSlider.value / volumeSlider.max;
  });
});
