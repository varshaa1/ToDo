'use strict';

angular.module('crudApp').factory('TaskService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAlltasks: loadAlltasks,
                getAlltasks: getAlltasks,
                gettask: gettask,
                createtask: createtask,
                updatetask: updatetask,
                removetask: removetask,
                searchtask: searchtask
            };

            return factory;
            
            function searchtask(task) {
            	
                var deferred = $q.defer();
                $http.put("http://localhost:8080/ToDoApp/api/find/", task)
                    .then(
                        function (response) {
                            
                        	 $localStorage.tasks = response.data;
                        	 
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating task with id :');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
            function loadAlltasks() {
                console.log('Fetching all tasks');
                var deferred = $q.defer();
                $http.get(urls.TASK_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Fetched successfully all tasks');
                            $localStorage.tasks = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading tasks');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAlltasks(){
                return $localStorage.tasks;
            }

            function gettask(id) {
                console.log('Fetching task with id :'+id);
                var deferred = $q.defer();
                $http.get(urls.TASK_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully task with id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading task with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createtask(task) {
                console.log('Creating task');
                var deferred = $q.defer();
                task.id=null;
                $http.post(urls.TASK_SERVICE_API, task)
                    .then(
                        function (response) {
                            loadAlltasks();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating task : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updatetask(task, id) {
                console.log('Updating task with id '+id);
                var deferred = $q.defer();
                $http.put(urls.TASK_SERVICE_API + id, task)
                    .then(
                        function (response) {
                            loadAlltasks();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating task with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removetask(id) {
                console.log('Removing task with id '+id);
                var deferred = $q.defer();
                $http.delete(urls.TASK_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAlltasks();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing task with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);