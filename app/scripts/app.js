'use strict';

/* app dependencies, and routes */

angular.module('LingfieldApp', [
		'ui.router'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/home');

			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'views/main.html'
				})
				.state('about', {
					url: '/about',
					templateUrl: 'views/about.html'
				})
				.state('parCoords', {
					url: '/Parallel-Coordinates',
					templateUrl: 'views/ParCoords.html',
					controller: 'ParCoordsCtrl'
				})
				.state('finSpdCalc', {
					url: '/Finishing-Speed-Calculator',
					templateUrl: 'views/finSpdCalc.html',
					controller: 'FinSpdCtrl'
				})
				.state('sandbox', {
					url: '/sandbox',
					templateUrl: 'views/sandbox.html',
					controller: 'SandboxCtrl'
				})
		}
	]);
