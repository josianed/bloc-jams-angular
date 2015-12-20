(function () {
	function SongPlayer() {
		var SongPlayer = {};

		var currentSong = null;
		var currentBuzzObject = null;

		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				if (currentBuzzObject) {
					currentBuzzObject.stop();
					currentSong.playing = null;
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
						currentBuzzObject.play();
				}
			}

				var currentBuzzObject = new buzz.sound(song.audioUrl, {
					formats: ['mp3'],
					preload: true
				});

				currentSong = song;

				currentBuzzObject.play();
				console.log(currentBuzzObject);
				song.playing = true;
			}

		};

		console.log(currentBuzzObject);


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