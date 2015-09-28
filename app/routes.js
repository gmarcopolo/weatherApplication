'use strict';

angular.module('WeatherApp')
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('login');

		$stateProvider.state('login', {
			url: '/login',
			templateUrl: 'modules/login/views/login.html',
			controller: 'LoginController',
			title: 'Home'
		});

		$stateProvider.state('app', {
			abstract: true,
			url: '',
			template: '<div ui-view layout="row" lex layout-fill></div>',
		});

		$stateProvider.state('app.main', {
			url: '/main',
			templateUrl: 'modules/main/views/main.html',
			controller: 'MainController',
			title: 'Main'
		});
		$stateProvider.state('app.admin', {
			url: '/admin',
			templateUrl: 'modules/admin/views/admin.html',
			controller: 'AdminController',
			title: 'Admin'
		});
	});