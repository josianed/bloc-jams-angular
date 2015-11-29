var blocJams = angular.module('blocJams', ['ui.router']);

blocJams.constant("CONFIG", {
	ALBUMS: [{
			name: 'The Colors 1',
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
			name: 'The Colors 2',
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
			name: 'The Colors 3',
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
		}
	]
});

blocJams.config(function($stateProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$stateProvider
	.state('album', {
		url: '/album/:id',
		// params: {
		// 	id: { value: '0' }
		// },
		templateUrl: '/templates/album.html',
		controller: "AlbumController",
	
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


blocJams.controller('CollectionController', ['$log', '$scope', 'CONFIG', function($log, $scope, CONFIG) {
	$log.debug("CollectionController");
	$scope.albumCollection = CONFIG.ALBUMS;

}]);


blocJams.controller('AlbumController', [
	'$scope',
	'$log',
	'$stateParams',
	'SongPlayer',
	'CONFIG',
	function($scope, $log, $stateParams, SongPlayer, CONFIG) {
		//alert("asdfadf");
		$log.debug("AlbumController");
		$log.debug($stateParams);

		$scope.album = CONFIG.ALBUMS[$stateParams.id];

		$scope.playSong = function(songIndex) {
			$log.debug(songIndex);
			SongPlayer.play(songIndex);
		};
		//$scope.playSong($scope.album.songs[0]);

		$scope.pauseSong = function() {
			SongPlayer.pause();
		};

		$scope.nextSong = function() {
			SongPlayer.nextSong();
		};

		$scope.previousSong = function() {
			SongPlayer.previousSong();
		};

		$scope.seek = function() {
			SongPlayer.seek();
		};
	}
]);


blocJams.factory('SongPlayer', ['$stateParams', 'CONFIG', function($stateParams, CONFIG) {

	//Store the state of playing songs
	var currentAlbum = CONFIG.ALBUMS[$stateParams.id];
	var currentSongFromAlbum = 0;
	var currentSoundFile = null;
	var currentVolume = 80;

	var trackIndex = function(album, song) {
			return album.songs.indexOf(song);
	};



	return {

		setSong: function(songIndex) {

			currentSongFromAlbum = currentAlbum.songs[songIndex];

			currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {

				formats: [ 'mp3' ],
				preload: true
			});

			setVolume(currentVolume);

		},

		play: function(songIndex) {
			setSong(songIndex);
			currentSoundFile.play();
		},

		pause: function() {
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
