(function () {

  'use strict';

  angular.module('PhoneBook')

    .config(Config);

    Config.$injec = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {    

      $urlRouterProvider.otherwise('/cursor');

      $stateProvider

      .state('cursor', {

        url : '/cursor',

        views: {

          '': {  
           
            templateUrl: 'templates/cursor.html'

          }
        }

      })

      .state('app', {

        url : '/app',

        views: {

          '': {  
           
            templateUrl: 'templates/app.html',
           
            controller: 'AppCtrl as vm'

          }
        }

      })

      .state('app.personas', {

        cache:false,
        
        url : '/personas',

        views: {

          'content': {  
            
            template: '<personas-component></personas-component>'

          }
        }

      }).state('app.persona', {

        cache:false,

        url : '/personas/:rut',

        views: {

          'content': {  
            
            template: '<persona-component></persona-component>'
          }
        }

      })

      .state('app.regiones', {

        cache:false,

        url : '/regiones',

        views: {

          'content': {  

            template: '<regiones-component></regiones-component>'

          }
        }

      })

      .state('app.region', {
        
        cache:false,

        url : '/regiones/:nombre',

        views: {

          'content': {  

            template: '<region-component></region-component>'

          }
        }

      });
    
    };

})();
