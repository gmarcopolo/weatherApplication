'use strict';

angular.module('WeatherApp')
	.controller('MainController', function($scope, $modal, $filter){
		$scope.cities = ['Laval','Montreal','Trois-Rivieres'];
		var holydays = ['Sun'];
		
		$scope.gridOptions = {};
		$scope.data = [];

		$scope.newCity = {
			name: ''
		};

		initSourceData();

		initTableOptions();
		initColumnDefs();
		setData();

		initLineOptions();
		setDataInLineChart();

		function initSourceData(){
			for (var i = 0; i < $scope.cities.length; i++) {
				$scope.data[i] = {
					'city': $scope.cities[i], 
					'1436918400000': randomTemp(),
					'1437004800000': randomTemp(),
					'1437091200000': randomTemp(),
					'1437177600000': randomTemp(),
					'1437264000000': randomTemp(),
					'1437350400000': randomTemp(),
					'1437436800000': randomTemp(),
					'1437523200000': randomTemp(),
					'1437609600000': randomTemp(),
					'1437696000000': randomTemp()
				};
			}
		}
		
		function randomTemp(){
			var randomBodyTemp = Math.floor(Math.random() * 10) + 27; 
			return randomBodyTemp;
		}

		function initTableOptions(){	
			$scope.gridOptions = {
				saveWidths: true,
			   	enableColumnResizing: true,
			   	showGridFooter: false, 	// total items showed
				enableGridMenu: true,
			   	enableSelectAll: true,
				enableFiltering: false,
			   	onRegisterApi: function(gridApi){
			     	$scope.gridApi = gridApi;
			   	},
				columnDefs: [],
				data: []
			};
		}

		function initColumnDefs(){
			for (var i in $scope.data[0]) {
				var field = [i][0];
				var columnDefToAdd = {};

				columnDefToAdd.field = field;
				

				if (field === 'city') {
					columnDefToAdd.cellTemplate = 'modules/main/views/cities.html';
				} else {
					columnDefToAdd.name = setDateFormat(field);

					var findHolyday = columnDefToAdd.name.toString();
					if (findHolyday.indexOf(holydays) >=0) {
						columnDefToAdd.cellClass = 'yellow';
					}
				}
				$scope.gridOptions.columnDefs.push(columnDefToAdd);
			}
		}

		function setDateFormat(d){
			var numericDate = parseInt(d);
			numericDate = new Date(numericDate);
			var dateFiltered = $filter('date')(numericDate, 'EEEE, MMMM d')
			return dateFiltered;
		}
		
		function setData(){
			for (var i = 0; i < $scope.data.length; i++) {
				var dataToAdd = $scope.data[i];
				setDataInTable(dataToAdd);

			}
		}
		
		function setDataInTable(dataToAdd){
			$scope.gridOptions.data.push(dataToAdd);
		}

		function initLineOptions(){
			$scope.line = {
				options: {
					chart: {
						legend: {
							key: function (d) { 
								return d.key;
							}
						},
						type: 'lineChart',
						margin : {
							top: 20,
							right: 20,
							bottom: 40,
							left: 55
						},
						x: function(d, i){
							return d.x; 
						},
						y: function(d){ 
							return d.y; 
						},
						useInteractiveGuideline: true,
						transitionDuration: 500,    
						yAxis: {
							axisLabel: 'Temperature C',
							tickFormat: function(d){
								return d3.format('.01f')(d);
							}
						},
						xAxis: {
							axisLabel: 'Time',
							tickFormat: function(d){
								return d3.time.format('%A %b %e')(new Date(d));
							}
						},
					}
				},
				data: []
			};
		}

		function setDataInLineChart(){
			for (var i = 0; i < $scope.data.length; i++) {
				var dataMap = $scope.data[i];
				var lineData = {
					key: $scope.data[i].city,
					values: []
				};
				for (var j in dataMap) {
					if (angular.isNumber(dataMap[j])) {
						var axisToAdd = {
							x: [j],
							y: dataMap[j]
						};
						lineData.values.push(axisToAdd);
					}
				}
				$scope.line.data.push(lineData);
			}
		}

		function addCityToData(){
			$scope.cities.push($scope.newCity.name);
			initSourceData();

			initTableOptions();
			initColumnDefs();
			setData();

			initLineOptions();
			setDataInLineChart();
		}

		$scope.addCity = function(){
		
			var modalInstance = $modal.open({
				templateUrl: 'modules/main/views/add_city.html',
				controller: function($scope, $modalInstance) {
					$scope.confirm = function () {
						$modalInstance.close($scope.newCity.name);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					city: function(){return $scope.newCity.name;},
				}
			});

			modalInstance.result.then(function (city) {
				$scope.newCity.name = city;
				addCityToData();
			}, function () {
			    
			});
		};

	});