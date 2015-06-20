(function() {

	var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		widget;

	function generateWeeks(date) {

		var y = date.getFullYear(),
			m = date.getMonth(),
			start = new Date(y, m, 1),
			end = new Date(y, m + 1, 0),
			firstDay = start.getDay(),
			lastDay = end.getDay(),
			days = [],
			weeks = [],
			i;

		for(i = 0; i < firstDay; i++) {
			days.push(null);
		}

		for(i = 1; i <= end.getDate(); i++) {
			days.push({
				d: i,
				date: new Date(y, m, i)
			});
		}

		for(i = lastDay + 1; i < 7; i++) {
			days.push(null);
		}

		for(i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}

		return weeks;
	}

	function controller($scope) {

		var timeIncrements = 30 * 60 * 1000,
			baseDay = $scope.ngModel || new Date(),
			adjustedDate = new Date(Math.ceil(baseDay.getTime() / timeIncrements) * timeIncrements),
			month = baseDay.getMonth(),
			year = baseDay.getFullYear();

		$scope.ngModel = adjustedDate;
		$scope.time = moment(adjustedDate).format('HH:mm');
		console.log($scope.time);
		$scope.times = [];

		for(var i = 0; i<24; i++) {

			var dh = i % 12,
				vh = i,
				a = i > 11 ? 'pm' : 'am';

			if(dh % 12 === 0 ) {
				dh = 12;
			}

			if(vh < 10) {
				vh = '0' + vh;
			}

			$scope.times.push({
				value: vh + ':00',
				display: dh  + ':00 ' + a
			});
			$scope.times.push({
				value: vh + ':30',
				display: dh + ':30 ' + a
			});
		}

		$scope.$watch('time', function(value) {

			var date = moment($scope.ngModel);
			$scope.ngModel = moment(date.format('YYYY-MM-DD ') + value, 'YYYY-MM-DD HH:mm').toDate();
		});

		update();

		$scope.next = function() {

			month++;
			update();
		};

		$scope.prev = function() {

			month--;
			update();
		};

		$scope.select = function(day) {

			if(day) {
				var date = moment(day.date);
				console.log(date.format('YYYY-MM-DD ') + $scope.time)
				$scope.ngModel = moment(date.format('YYYY-MM-DD ') + $scope.time, 'YYYY-MM-DD HH:mm').toDate();
				$scope.close();
			}
		};

		$scope.isSelected = function(d) {
			var model = $scope.ngModel;
			return model && d && model.getTime() === d.date.getTime();
		};

		$scope.open = function() {

			console.log('clickity click');
			widget.addClass('open');
		};

		$scope.close = function() {

			widget.removeClass('open');
		};

		function update() {

			var date = new Date(year, month);
			$scope.month = months[(12 + date.getMonth() % 12) % 12];
			$scope.weeks = generateWeeks(date);
			$scope.year = date.getFullYear();
		}
	}

	function directive() {

		return {
			scope: {
				ngModel: "=",
				bgCalYear: "@",
				bgCalMonth: "@"
			},
			templateUrl: '/calendar.html',
			link: function(scope, el, attr) {
				widget = el;
				console.log(el);
			},
			controller: controller
		}
	}

	angular.module('blakgeek.calendar', [])
		.directive('bgCal', directive)
		.filter('moment', function() {
			return function(input, format) {
				format = format || 'MM/DD/YYYY @ h:mm:ss a';
				return moment(input).format(format);
			}
		});

})();
