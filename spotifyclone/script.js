document.addEventListener('DOMContentLoaded', function () {
  const audioElement = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');
  const songTime = document.querySelector('.song-time');
  const songTitle = document.getElementById('song-title');
  const artistName = document.getElementById('artists-name');
  const albumArt = document.getElementById('album-art');

  let songs = [
    { title: 'Hass Hass', artist: 'Diljit × sia', src: 'music/hasshass.opus', img: 'images/hasshass.png' },
    { title: 'Naina("From Crew")', artist: 'Diljit Dosanjh..', src: 'music/naina.opus', img: 'images/naina.png' },
    { title: 'Subhanallah', artist: 'Pritam..', src: 'music/subhanallah.opus', img: 'images/subhanallah.png' },
    { title: 'Born to Shine', artist: 'Diljit Dosanjh..', src: 'music/diljit.opus', img: 'images/born .png' },
    { title: 'Chaleya', artist: 'Arijit singh..', src: 'music/chaleya.opus', img: 'images/chaleya.png' },
    { title: 'SOFTLY', artist: 'Karan Aujla..', src: 'music/softly.opus', img: 'images/softly.png' },
  ];

  let currentSongIndex = 0;
  let isPlaying = false;

  function playSong(song) {
    audioElement.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.img;
    audioElement.play();
    playPauseButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="5" width="4" height="14" fill="black"/>
        <rect x="14" y="5" width="4" height="14" fill="black"/>
      </svg>`;
    currentSongIndex = songs.indexOf(song);
    isPlaying = true;
  }

  function playNextSong() {
    audioElement.pause(); 
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
  }

  function playPreviousSong() {
    audioElement.pause(); 
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
  }

  playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
      audioElement.play();
      playPauseButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="5" width="4" height="14" fill="black"/>
          <rect x="14" y="5" width="4" height="14" fill="black"/>
        </svg>`;
      isPlaying = true;
    } else {
      audioElement.pause();
      playPauseButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19L19 12L8 5Z" fill="black"/>
        </svg>`;
      isPlaying = false;
    }
  });

  audioElement.addEventListener('timeupdate', () => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration || 0; 
    songTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
  });

  audioElement.addEventListener('loadedmetadata', () => {
    const duration = audioElement.duration;
    songTime.textContent = `0:00 / ${formatTime(duration)}`;
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * audioElement.duration;
    audioElement.currentTime = newTime;
  });

  prevButton.addEventListener('click', playPreviousSong);
  nextButton.addEventListener('click', playNextSong);

  audioElement.addEventListener('ended', playNextSong);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  playSong(songs[0]);
  audioElement.pause(); 
  playPauseButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="black"/>
    </svg>`;
});
