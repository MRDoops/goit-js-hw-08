
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 236203659,
  width: 640,
  height: 360,
  autopause: false,
});

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);

const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player.setCurrentTime(currentTime);
}