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
	// $scope.albumCollection = {
	// 	albums: [
	// 		{imgsrc: "assets/images/album_covers/01.png" , name: "The Colors", artist: "Pablo Picasso", songs: "X Songs"}
	// 	]
	// };

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
	];

}]);


blocJams.controller('AlbumController', ['$scope', function($scope) {
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