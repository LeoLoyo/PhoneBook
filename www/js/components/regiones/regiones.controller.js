(function(){
	
	'use strict';

	var app = angular.module('PhoneBook.regiones',[]);

    app.component('regionesComponent',{

        templateUrl:'js/components/regiones/regiones.html',

        controller: RegionesCtrl,

        controllerAs:'vm'

    });

    app.component('regionComponent',{

        templateUrl:'js/components/regiones/region.html',

        controller: RegionCtrl,

        controllerAs:'vm'

	});

    RegionesCtrl.$injec = ['API', '$scope'];

	function RegionesCtrl(API, $scope){

        var vm = this;

        vm.regiones = [];

        vm.ObtenerRegiones = function(){
           
            API.getData('region').then(function(res){

                if(res.error){

                    vm.regiones = [{error:'Sin Respuesta del servidor'}]

                }else{

                    vm.regiones = res;

                }

                $scope.$broadcast('scroll.refreshComplete');
           
            });
            
        };

        vm.ObtenerRegiones();

        return vm;
            
	}

    function RegionCtrl(API, $stateParams, $timeout){

        var vm = this;

        vm.region = {}

        vm.habitantes = []

        var REGIONES = [],
            PERSONAS = [];


        vm.getRegion = function(){
            
            REGIONES = API.getRegiones();

            API.getData('persona').then(function(res){

                PERSONAS = res;


                if(REGIONES.length > 0){

                    angular.forEach(REGIONES, function(value,key){
                  
                        if(value.nombre == $stateParams.nombre){
                         
                         angular.forEach(PERSONAS, function(persona, key){

                            angular.forEach(value.comunas, function(comuna, key){
                                
                                if(persona.direccion.comuna.nombre === comuna.nombre){
                                
                                    vm.habitantes.push(persona);
                                }
                            })

                         });

                        vm.region = value;  
                      }

                    });

                }

            });
        
        };

        $timeout(vm.getRegion(), 10);

        return vm;

    }

})();
