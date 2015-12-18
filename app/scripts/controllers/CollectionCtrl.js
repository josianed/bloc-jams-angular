(function() {
	function CollectionCtrl(Fixtures) {
		this.albums = [];
		var album = Fixtures.getAlbum();
		for (var i = 0; i < 12; i++) {
			this.albums.push(angular.copy(album));
		}
	}

	angular
		.module('blocJams')
		.controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();