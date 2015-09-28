var blocJams = angular.module('blocJams', ['ui.router']);

var blocJams.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider.state('album', {
        url: '/album',
        controller: 'Album.comtroller',
        templateUrl: '/templates/album.html'
    });
    
});