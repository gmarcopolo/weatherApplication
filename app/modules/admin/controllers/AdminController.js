'use strict';

angular.module('WeatherApp')
	.controller('AdminController', function($scope, $modal, $filter){

		$scope.newUser = {};

		var date = $filter('date')(new Date(), 'medium');

		var columnDefs = [
			{ field: 'User', name: 'User' },
			{ field: 'Username', name: 'Username' },
			{ field: 'lastLogued', name: 'Last logued in' },
		];

		var data = [
			{
				'User': 'John Doe',
				'Username': 'Carney',
				'lastLogued': date,
			},
			{
				'User': 'Stephen Diamond',
				'Username': 'Wise',
				'lastLogued': date,
			},
		];

		function addUserToData(){
			console.log($scope.newUser);
			

			var newData = {
				'User': $scope.newUser.name,
				'Username': $scope.newUser.userName,
				'lastLogued': date
			};
			$scope.gridOpts.data.push(newData);
		}

		$scope.gridOpts = {
			columnDefs: columnDefs,
			data: data
		};

		$scope.addUser = function(){
		
			var modalInstance = $modal.open({
				templateUrl: 'modules/admin/views/add_user.html',
				controller: function($scope, $modalInstance) {
					$scope.confirm = function () {
						$modalInstance.close($scope.newUser);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					city: function(){return $scope.newUser;},
				}
			});

			modalInstance.result.then(function (city) {
				$scope.newUser = city;
				addUserToData();
			}, function () {
			    
			});
		};

	});