(function () {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};

		/**
		* @desc album information incl songs
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();

		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function playSong
		* @desc plays the current Buzz object and sets the song object to true
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		}

		/**
		* @function stopSong
		* @desc stops the current Buzz object and sets the song object to false
		*/
		var stopSong = function() {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		}

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			currentBuzzObject.bind('volumechange', function() {
				$rootScope.$apply(function() {
					SongPlayer.volume = currentBuzzObject.getVolume();
				});
			});

			SongPlayer.currentSong = song;
		};

		/**
		* @function getSongIndex
		* @desc Gets the index of the currently playing song
		* @param {Object} song
		* @returns index
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		/**
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;

		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;

		/**
		* @desc Current value of volume
		* @type {Number}
		*/
		SongPlayer.volume = null;

		/**
		* @desc Max value of volume
		* @type {Number}
		*/
		SongPlayer.maxVolume = 100;

		/**
		* @function play
		* @desc Checks if the clicked song is a new song or the current paused song and plays it
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			//song = song --> when method is called from the Album view's song rows
			//song = SongPlayer.currentSong --> when the method is called from the player bar
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);	
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}

		};

		/**
		* @function pause
		* @desc Pauses the currently playing song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function previous
		* @desc Gets the index of the current song and decreases it by one, and plays the previous song
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

			if (currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function next
		* @desc Gets the index of the current song and increases it by one, and plays the next song
		*/
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex > currentAlbum.songs.length - 1) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		/**
		* @function setVolume
		* @desc Sets the volume 
		* @param {Number} volume
		*/
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();