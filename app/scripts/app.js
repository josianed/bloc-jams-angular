var blocJams = angular.module('blocJams', ['ui.router']);

blocJams.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider
    	.state('album', {
	        url: '/album',
	        controller: 'Album.controller',
	        templateUrl: '/templates/album.html'
    	})

    	.state('collection', {
    		url: '/collection',
    		controller: 'Collection.controller',
    		templateUrl: '/templates/collection.html'
    	})

    	.state('landing', {
    		url: '/landing',
    		controller: 'Landing.controller',
    		templateUrl: '/templates/landing.html'
    	});
    
});


//create controllers for landing, collection, and album
blocJams.controller('LandingController', ['$scope', function($scope) {
	$scope.title = "Turn the music up!";
}]);


blocJams.controller('CollectionController', ['$scope', function($scope) {
	$scope.albumCollection = {
		albums: [
			{imgsrc: "assets/images/album_covers/01.png" , name: "The Colors", artist: "Pablo Picasso", songs: "X Songs"}
		]
	};

}]);


blocJams.controller('AlbumController', ['$scope', function($scope) {
	$scope.albumPicasso = {
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