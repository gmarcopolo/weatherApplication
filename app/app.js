'use strict';

angular.module('WeatherApp', [
    'ui.router',
    'ngMaterial',
    'ui.bootstrap',
	'ngMdIcons',
    'ngCookies',
	'ngSanitize',
	'LocalStorageModule',
	'nvd3',
	'pascalprecht.translate',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.selection'
]);

angular.module('WeatherApp')
  .config(function($translateProvider, localStorageServiceProvider) {
    $translateProvider.translations('en', WEATHER_APP_I18N_EN);
    
    $translateProvider.preferredLanguage('en', WEATHER_APP_I18N_EN);
    $translateProvider.fallbackLanguage('en', WEATHER_APP_I18N_EN);
    $translateProvider.useSanitizeValueStrategy('sanitize');
   
    $translateProvider.useCookieStorage(); 

    localStorageServiceProvider.setPrefix('WeatherApp');
    localStorageServiceProvider.setStorageType('localStorage');
});


angular.module('WeatherApp')
    .run(function($rootScope, $state, localStorageService) {      
      $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
        
        var currentTitle = $state.current.title;
        var currentName = $state.current.name;
        var userName = localStorageService.get('username');

        $rootScope.app = {
            state: {
                title: currentTitle,
                name: currentName,
            },
            user: userName
        }
    });
});