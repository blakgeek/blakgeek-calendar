angular.module('example', ['blakgeek.calendar']).controller('ExampleCtrl', function($scope) {

	var defaultDate = new Date(2015,11,15);

	$scope.reset = function() {
		$scope.date = defaultDate;
	};

});