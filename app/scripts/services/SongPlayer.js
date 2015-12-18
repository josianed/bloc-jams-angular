(function () {
	function SongPlayer() {
		var SongPlayer = {};

		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				if (currentBuzzObject) {
					currentBuzzObject.stop();
					currentSong.playing = null;
				}

			var currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;

			currentBuzzObject.play();
			song.playing = true;

			}

		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();