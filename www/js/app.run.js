(function(){    
    'use strict';

    var app = angular.module('PhoneBook', ['ionic','PhoneBook.personas', 'PhoneBook.regiones'])

    app.run(Run);

    app.factory('API', API);
    
    app.controller('AppCtrl', AppCtrl);

    app.constant('$ionicLoadingConfig', { template :'<ion-spinner icon="spiral"></ion-spinner>' })

    Run.$injec = ['$ionicPlatform', '$state', '$ionicPopup', '$ionicHistory'];
    
    API.$inject = ['$http','$ionicLoading'];
    
    AppCtrl.$inject = [];

    function Run($ionicPlatform, $state, $ionicPopup, $ionicHistory, $timeout) {
    
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    };

    function API($http, $ionicLoading){
        
        var self = this;

        self.PERSONAS = [];

        self.REGIONES = [];
        
        self.getPersonas = function(){
    
            return self.PERSONAS;
            
        };

        self.getRegiones = function(){

            return self.REGIONES;

        };

        self.getData = function(recurso){
    
            $ionicLoading.show();
            
            // var url = recurso==="persona"?'/js/data/persona.json':'/js/data/regiones.json';
            
            return $http.get('https://private-de931-phonebooktest.apiary-mock.com/' + recurso).then(
            // return $http.get(url).then(
    
                function successCallback(res) {

                    $ionicLoading.hide();
                    console.log(recurso)

                    if(recurso === 'persona'){
                    
                        self.PERSONAS = res.data;
                    
                        return self.PERSONAS;
                    
                    }else if(recurso === 'region' ){
                    
                        self.REGIONES = res.data;
                    
                        return self.REGIONES;
                    
                    }

                }, function errorCallback(error) {

                    $ionicLoading.hide();
                    var res = {error:true}
                    return res;

            });

        };

        return self;

    };

    function AppCtrl($ionicHistory){

        var vm = this;

        return vm;
    }

})();
