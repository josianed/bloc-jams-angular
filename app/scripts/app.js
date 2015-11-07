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
	
	$scope.albumCollection = [
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

	angular.copy($scope.albumCollection);

}]);


blocJams.controller('AlbumController', ['$scope', 'SongPlayer', function($scope) {
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
}]);


blocJams.factory('SongPlayer', [function() {


 var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
 };


 var nextSong = function() {

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
    updateSeekBarWhileSongPlays();
    // currentlyPlayingSongNumber = currentSongIndex + 1;
    // currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    //updatePlayerBarSong() function, but modifying left controls
    var songName = document.getElementsByClassName('currently-playing song-name');
    var artistName = document.getElementsByClassName('currently-playing artist-name');
    var artistSongMobile = document.getElementsByClassName('currently-playing artist-song-mobile');

    songName.text(currentSongFromAlbum.name);
    artistName.text(currentAlbum.artist);
    artistSongMobile.text(currentSongFromAlbum.name + " - " + currentAlbum.name);

    document.getElementsByClassName('left-controls play-pause').innerHtml = playerBarPauseButton;

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var newCurrentSongNumberCell = document.getElementsByClassName('song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    // var $newCurrentSongNumberCell = (getSongNumberCell() + '[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var previousSongNumberCell = document.getElementsByClassName('song-item-number[data-song-number="' + lastSongNumber + '"]');
    // var $previousSongNumberCell = (getSongNumberCell + '[data-song-number="' + lastSongNumber + '"]');

    newCurrentSongNumberCell.innerHtml = pauseButtonTemplate;
    previousSongNumberCell.innerHtml = lastSongNumber;

 };


 var previousSong = function() {

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
    updateSeekBarWhileSongPlays();
    // currentlyPlayingSongNumber = currentSongIndex + 1;
    // currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    //updatePlayerBarSong() function, but modifying left controls
    var songName = $('.currently-playing .song-name');
    var artistName = $('.currently-playing .artist-name');
    var artistSongMobile = $('.currently-playing .artist-song-mobile');

    songName.text(currentSongFromAlbum.name);
    artistName.text(currentAlbum.artist);
    artistSongMobile.text(currentSongFromAlbum.name + " - " + currentAlbum.name);

    $('.left-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var newCurrentSongNumberCell = document.getElementsByClassName('song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    // var $newCurrentSongNumberCell = (getSongNumberCell() + '[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var previousSongNumberCell = document.getElementsByClassName('song-item-number[data-song-number="' + lastSongNumber + '"]');
    // var $previousSongNumberCell = (getSongNumberCell + '[data-song-number="' + lastSongNumber + '"]');

    previousSongNumberCell.innerHtml = lastSongNumber;
    newCurrentSongNumberCell.innerHtml = pauseButtonTemplate;

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


 var seek = function(time) {
    if (currentSoundFile) {
      currentSoundFile.setTime(time);
    }
 }


 var setVolume = function(volume) {
    if (currentSoundFile) {
      currentSoundFile.setVolume(volume);
    }
 };


 var getSongNumberCell = function(number) {

  var songNumberCell = document.getElementsByClassName('song-item-number');

  return songNumberCell;

 };


 var togglePlayFromPlayerBar = function() {

  var songNumberCell = document.getElementsByClassName('song-item-number');

    if (currentSoundFile.isPaused()) {
      songNumberCell.html(playerBarPauseButton);
      playPause.html(playerBarPauseButton);
      currentSoundFile.play();
    } else if (currentSoundFile) {
      songNumberCell.html(playerBarPauseButton);
      playPause.html(playerBarPauseButton);
      currentSoundFile.pause();
    }

 };


 //Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 //Store the state of playing songs
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;

//next and previous buttons
 var previousButton = document.getElementsByClassName('main-controls previous');
 var nextButton = document.getElementsByClassName('main-controls next');
 var playPause = document.getElementsByClassName('main-controls play-pause');
	
}]);
