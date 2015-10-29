angular.module('example', ['bg.calendar']).controller('ExampleCtrl', function($scope, $timeout) {

	var defaultDate = new Date(2015,11,15);

	$timeout(function() {
		$scope.date2 = "2015-12-15T13:30:00.000Z";

	}, 2000);

	$scope.reset = function() {
		$scope.date1 = defaultDate;
	};

});