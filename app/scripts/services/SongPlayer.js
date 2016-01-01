(function () {
	function SongPlayer(Fixtures) {
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
     		console.log("current song index is" + currentSongIndex);

			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				console.log("previous song is " + song);
				setSong(song);
				playSong(song);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();