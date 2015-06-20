(function () {
  'use strict';
  var app = angular.module('helloApp', ['ui.router']);

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('main', {
        abstract: true,
        templateUrl: 'index.html',
        controller: 'MainController'
      })

      .state('main.principal', {
        url: '/',
        parent: 'main',
        templateUrl: 'templates/principal.html',
        controller: 'PrincipalController'
      })

      .state('main.lista', {
        url: '/lista/:Uf/:Nome',
        parent: 'main',
        templateUrl: 'templates/lista.html',
        controller: 'ListaController'
      })

      .state('main.candidato', {
        url: '/candidato/:Id',
        parent: 'main',
        templateUrl: 'templates/candidato.html',
        controller: 'CandidatoController'
      });

    $urlRouterProvider.otherwise('/');
  })

  .controller('MainController', ['$scope',  '$state', function ($scope, $state) {
    $scope.goPrincipal = function () {
      $state.go('main.principal', {});
    };
  }])

  .controller('PrincipalController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    $scope.estados = [
      { name: 'AC', value: 'ac' },
      { name: 'AL', value: 'al' },
      { name: 'AP', value: 'ap' },
      { name: 'AM', value: 'am' },
      { name: 'BA', value: 'ba' },
      { name: 'CE', value: 'ce' },
      { name: 'DF', value: 'df' },
      { name: 'ES', value: 'es' },
      { name: 'GO', value: 'go' },
      { name: 'MA', value: 'ma' },
      { name: 'MT', value: 'mt' },
      { name: 'MS', value: 'ms' },
      { name: 'MG', value: 'mg' },
      { name: 'PA', value: 'pa' },
      { name: 'PB', value: 'pb' },
      { name: 'PR', value: 'pr' },
      { name: 'PE', value: 'pe' },
      { name: 'PI', value: 'pi' },
      { name: 'RJ', value: 'rj' },
      { name: 'RN', value: 'rn' },
      { name: 'RS', value: 'rs' },
      { name: 'RO', value: 'ro' },
      { name: 'RR', value: 'rr' },
      { name: 'SC', value: 'sc' },
      { name: 'SP', value: 'sp' },
      { name: 'SE', value: 'se' },
      { name: 'TO', value: 'to' }
    ];

    $scope.goLista = function () {
      $state.go('main.lista', {
        'Uf': $scope.uf,
        'Nome': $scope.nome
      });
    };
  }])

  .controller('ListaController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    var url = 'http://apitreinamento.autoglass.com.br:80/api/canditados?';

    $http.get(url + 'uf=' + $state.params.Uf + '&nome=' + $state.params.Nome)
      .success(function (resultado) {
        $scope.candidatos = resultado;
      });

    $scope.goCandidato = function (id) {
      $state.go('main.candidato', {
        'Id': id
      });
    };
  }])

  .controller('CandidatoController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    var url = 'http://apitreinamento.autoglass.com.br:80/api/candidatos/';
    $scope.aba = 1;

    $http.get(url + $state.params.Id)
      .success(function (resultado) {
        $scope.candidato = resultado;
    });

    $scope.click = function (aba) {
      $scope.aba = aba;
      if (aba == 2) {
        $http.get(url + $state.params.Id + '/bens')
          .success(function (resultado) {
            $scope.bens = resultado;
          });
      }
    };
  }]);
}());
