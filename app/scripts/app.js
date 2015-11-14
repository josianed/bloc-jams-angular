var blocJams = angular.module('blocJams', ['ui.router']);

blocJams.config(function($stateProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$stateProvider
	.state('album', {
		url: '/album',
		controller: 'AlbumController',
		templateUrl: '/templates/album.html'
	})

	.state('collection', {
		url: '/collection',
		controller: 'CollectionController',
		templateUrl: '/templates/collection.html'
	})

	.state('landing', {
		url: '/landing',
		controller: 'LandingController',
		templateUrl: '/templates/landing.html'
	});

});

//example how to log messages to the console to debug
// blocJams.controller("RyanController", [
// 	"$scope",
// 	"$log", add log
// 	function($scope, $log) {
// 		$log.debug("RyanController"); add message to log to console
// 		$scope.headline = "It Works!";
// 	}
// ]);


//create controllers for landing, collection, and album
blocJams.controller('LandingController', [
	'$scope',
	'$log',
	function($scope, $log) {
		$log.debug("LandingController");
		$scope.title = "Turn the music up!";
	}
]);


blocJams.controller('CollectionController', ['$scope', function($scope) {

	$scope.albumCollection = [{
		name: 'The Colors',
		artist: 'Pablo Picasso',
		label: 'Cubism',
		year: '1881',
		albumArtUrl: 'assets/images/album_covers/01.png',
		songs: [
		{ name: 'Blue', length: 161.71, audioUrl: 'assets/music/blue' },
		{ name: 'Green', length: 103.96, audioUrl: 'assets/music/green' },
		{ name: 'Red', length: 268.45, audioUrl: 'assets/music/red' },
		{ name: 'Pink', length: 153.14, audioUrl: 'assets/music/pink' },
		{ name: 'Magenta', length: 374.22, audioUrl: 'assets/music/magenta' }
		]
	},
	{
		name: 'The Colors',
		artist: 'Pablo Picasso',
		label: 'Cubism',
		year: '1881',
		albumArtUrl: 'assets/images/album_covers/01.png',
		songs: [
		{ name: 'Blue', length: 161.71, audioUrl: 'assets/music/blue' },
		{ name: 'Green', length: 103.96, audioUrl: 'assets/music/green' },
		{ name: 'Red', length: 268.45, audioUrl: 'assets/music/red' },
		{ name: 'Pink', length: 153.14, audioUrl: 'assets/music/pink' },
		{ name: 'Magenta', length: 374.22, audioUrl: 'assets/music/magenta' }
		]
	},
	{
		name: 'The Colors',
		artist: 'Pablo Picasso',
		label: 'Cubism',
		year: '1881',
		albumArtUrl: 'assets/images/album_covers/01.png',
		songs: [
		{ name: 'Blue', length: 161.71, audioUrl: 'assets/music/blue' },
		{ name: 'Green', length: 103.96, audioUrl: 'assets/music/green' },
		{ name: 'Red', length: 268.45, audioUrl: 'assets/music/red' },
		{ name: 'Pink', length: 153.14, audioUrl: 'assets/music/pink' },
		{ name: 'Magenta', length: 374.22, audioUrl: 'assets/music/magenta' }
		]
	}];

}]);


blocJams.controller('AlbumController', ['$scope', function($scope, SongPlayer) {
	$scope.album = {
		name: 'The Colors',
		artist: 'Pablo Picasso',
		label: 'Cubism',
		year: '1881',
		albumArtUrl: 'assets/images/album_covers/01.png',
		songs: [
			{ name: 'Blue', length: 161.71, audioUrl: 'assets/music/blue' },
			{ name: 'Green', length: 103.96, audioUrl: 'assets/music/green' },
			{ name: 'Red', length: 268.45, audioUrl: 'assets/music/red' },
			{ name: 'Pink', length: 153.14, audioUrl: 'assets/music/pink' },
			{ name: 'Magenta', length: 374.22, audioUrl: 'assets/music/magenta' }
		]
	};

	$scope.playSong = function(song) {
		SongPlayer.play();
	};

	$scope.pauseSong = function(song) {
		SongPlayer.pause();
	};

	$scope.nextSong = function(song) {
		SongPlayer.nextSong();
	};

	$scope.previousSong = function(song) {
		SongPlayer.previousSong();
	};

	$scope.seek = function() {
		SongPlayer.seek();
	};
}]);


blocJams.factory('SongPlayer', [function() {

	//Store the state of playing songs
	var currentAlbum = album;
	var currentlyPlayingSongNumber = null;
	var currentSongFromAlbum = null;
	var currentSoundFile = null;
	var currentVolume = 80;

	var trackIndex = function(album, song) {
			return album.songs.indexOf(song);
	};

	var setSong = function(songNumber) {

		if (currentSoundFile) {
			currentSoundFile.stop();
		}

		currentlyPlayingSongNumber = parseInt(songNumber + 1);
		currentSongFromAlbum = currentAlbum.songs[songNumber];

		currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {

			formats: [ 'mp3' ],
			preload: true
		});

		setVolume(currentVolume);

	};


	return {

		play: function() {
			if (!this.playing) {
				setSong(currentSongFromAlbum);
				this.playing = true;
			} else {
				this.playing = true;
			}
			currentSoundFile.play();
		},

		pause: function() {
			this.playing = false;
			currentSoundFile.pause();
		},

		nextSong: function() {

			var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
			currentSongIndex++;

			if (currentSongIndex >= currentAlbum.songs.length) {
				currentSongIndex = 0;
			}

			var getLastSongNumber = function(index) {
				if (index === 0) {
					return currentAlbum.songs.length;
				} else {
					return index;
				}
			};

			setSong(currentSongIndex);
			currentSoundFile.play();

		},


		previousSong: function() {

			var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				currentSongIndex = currentAlbum.songs.length - 1;
			}

			var getLastSongNumber = function(index) {
				if (index === currentAlbum.songs.length - 1) {
					return 1;
				} else {
					return index + 2;
				}
			};

			setSong(currentSongIndex);
			currentSoundFile.play();

		},


		seek: function(time) {
			if (currentSoundFile) {
				currentSoundFile.setTime(time);
			}
		},


		setVolume: function(volume) {
			if (currentSoundFile) {
				currentSoundFile.setVolume(volume);
			}
		}

	}

}]);
