'use strict';

angular.module('WeatherApp')
	.controller('AppController', function($scope, $state, localStorageService){


		$scope.goToMain = function(){
			var stateName = $state.current.name;
			if (stateName !== 'login') {
				$state.go('app.main');	
			}
		}
	});