var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/ToDoApp',
    TASK_SERVICE_API : 'http://localhost:8080/ToDoApp/api/task/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'page/home',
                controller:'TaskController',
                controllerAs:'ctrl',
                resolve: {
                    tasks: function ($q, TaskService) {
                        console.log('Load all tasks');
                        var deferred = $q.defer();
                        TaskService.loadAlltasks().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            })
            
             .state('index.managetasks', {
                url: '/managetasks',
                templateUrl: 'page/managetasks',
                controller:'TaskController',
                controllerAs:'ctrl',
                resolve: {
                    tasks: function ($q, TaskService) {
                        console.log('Load all tasks');
                        var deferred = $q.defer();
                        TaskService.loadAlltasks().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
             
            })
            
             .state('index.viewtasks', {
                url: '/viewtasks',
                templateUrl: 'page/viewtasks',
                controller:'TaskController',
                controllerAs:'ctrl'
             
            });
            
        $urlRouterProvider.otherwise('/');
    }]);

