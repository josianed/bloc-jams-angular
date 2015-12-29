(function () {
	function SongPlayer() {
		var SongPlayer = {};

		/**
		* @desc an instance of the Buzz object audio file
		* @type {Object}
		*/
		var currentSong = null;

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
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};

		/**
		* @function SongPlayer.play
		* @desc Checks if the clicked song is a new song or a paused song and plays it
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);	
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}

		};

		/**
		* @function SongPlayer.pause
		* @desc Pauses the currently playing song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
			console.log(currentBuzzObject);
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();