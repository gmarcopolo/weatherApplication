'use strict';

angular.module('WeatherApp')
	.controller('LoginController', function($scope, $state, localStorageService){
		$scope.login = function(credentials){
			$state.go('app.main');
			localStorageService.set('username', credentials.username);
		}
	});