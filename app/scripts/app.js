(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});

		$stateProvider
			.state('album', {
				url: '/album/:id',
				templateUrl: '/templates/album.html',
				controller: 'AlbumController'
			})

			.state('collection', {
				url: '/collection',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
			})

			.state('landing', {
				url: '/landing',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			});
		}

	angular
		.module('blocJams', ['ui.router'])
		.config(config);

})();

