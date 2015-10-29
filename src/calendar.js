(function() {

	'use strict';

	angular.module('bg.calendar', [])
		.directive('bgCalendar', function() {

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
			];

			return {
				scope: {
					ngModel: "=",
					timeIncrement: "@"
				},
				templateUrl: '/calendar.html',
				controller: ['$scope', '$element', '$attrs', controller]
			};

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
						date: moment(new Date(y, m, i)).format('YYYYMMDD')
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

			function controller($scope, $element, $attrs) {

				var timeIncrement = +($attrs.timeIncrement || 30);
				var milliStep = timeIncrement * 60 * 1000;
				var baseDay = new Date($scope.ngModel || new Date());
				var adjustedDate = new Date(Math.ceil(baseDay.getTime() / milliStep) * milliStep);
				var month = baseDay.getMonth();
				var year = baseDay.getFullYear();
				var d = moment('19761215', 'YYYYMMDD');
				var i;

				$scope.date = moment(adjustedDate).format('YYYYMMDD');
				$scope.time = moment(adjustedDate).format('HH:mm');
				$scope.times = [];

				for(i = 0; i < 1440; i += timeIncrement) {

					$scope.times.push({
						value: d.format('HH:mm'),
						display: d.format('h:mm a')
					});
					d.add(timeIncrement, 'm');
				}

				$attrs.$observe('timeIncrement', function(val) {

					var i;
					timeIncrement = val;

					for(i = 0; i < 1440; i += timeIncrement) {

						$scope.times.push({
							value: d.format('HH:mm'),
							display: d.format('h:mm a')
						});
						d.add(timeIncrement, 'm');
					}
				});

				$scope.$watch('ngModel', function(newVal, oldVal) {

					if(angular.isString(newVal)) {
						newVal = new Date(newVal);
					}

					if(angular.isDate(newVal) &&
						(!angular.isDate(oldVal) ||
						(angular.isDate(oldVal) && newVal.getTime() !== oldVal.getTime()))
					) {
						var date = moment(newVal);
						$scope.date = date.format('YYYYMMDD');
						$scope.time = date.format('HH:mm');
					}
				});

				$scope.$watchGroup(['date', 'time'], function() {

					$scope.ngModel = moment($scope.date + $scope.time, 'YYYYMMDDHH:mm').toDate();
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
						$scope.date = day.date;
					}
				};

				$scope.isSelected = function(d) {

					return d && d.date === $scope.date;
				};

				$scope.open = function() {

					$element.addClass('open');
					$scope.isOpen = true;
				};

				$scope.toggle = function() {

					$element.toggleClass('open');
					$scope.isOpen = !$scope.isOpen;
				};

				$scope.close = function() {

					$element.removeClass('open');
					$scope.isOpen = false;
				};

				function update() {

					var date = new Date(year, month);
					$scope.month = months[(12 + date.getMonth() % 12) % 12];
					$scope.weeks = generateWeeks(date);
					$scope.year = date.getFullYear();
				}
			}
		})
		.filter('moment', function() {
			return function(input, format) {
				format = format || 'MM/DD/YYYY @ h:mm:ss a';
				return moment(input).format(format);
			}
		});

})();
