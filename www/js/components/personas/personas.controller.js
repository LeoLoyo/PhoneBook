(function(){
	
	'use strict';

	var app = angular.module('PhoneBook.personas',[]);
    
    app.component('personasComponent',{

        templateUrl:'js/components/personas/personas.html',

        controller: PersonasCtrl,

        controllerAs:'vm'

    });

    app.component('personaComponent',{

        templateUrl:'js/components/personas/persona.html',

        controller: PersonaCtrl,

        controllerAs:'vm'

	});

    PersonasCtrl.$injec = ['API', '$scope'];

	function PersonasCtrl(API, $scope){

        var vm = this;

        vm.personas = [];

        vm.ObtenerPersonas = function(){

            API.getData('persona').then(function(res){

                if(res.error){

                    vm.personas = [{error:'Sin Respuesta del servidor'}]

                }else{

                    vm.personas = res;

                }

                $scope.$broadcast('scroll.refreshComplete');
               
            });

        };

        vm.ObtenerPersonas();

        return vm;
            
	}

    function PersonaCtrl(API, $stateParams, $timeout){
        
        var  vm = this;

        vm.persona = {};

        var PERSONAS = [];

        vm.getPersona = function(){

            PERSONAS = API.getPersonas();

            if(PERSONAS.length > 0){

                angular.forEach(PERSONAS, function(value,key){
              
                    if(value.rut == $stateParams.rut){

                        vm.persona = value;

                        vm.persona.telefono = vm.persona.telefono.toString();

                        var arrayTelefono = vm.persona.telefono.split("")

                        vm.persona.telefono_valido = arrayTelefono.length===11?true:false; 

                        vm.persona.rut_valido = false; 

                        var arrayRut = vm.persona.rut.split("");

                        if(arrayRut.length === 10){

                            if(arrayRut[arrayRut.length-2] ==="-"){

                                if(arrayRut[arrayRut.length-1] ==="k" || typeof Number(arrayRut[arrayRut.length-1]) === 'number'){

                                    vm.persona.rut_valido = true;
                                }

                            }

                        }

                    }

                });

            }

        }

        $timeout(vm.getPersona(), 10)

        return vm;
    }

})();
