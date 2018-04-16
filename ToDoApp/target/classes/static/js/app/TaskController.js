'use strict';

angular.module('crudApp').controller('TaskController',
    ['TaskService', '$scope',  function( TaskService, $scope) {

        var self = this;
        self.task = {};
        self.tasks=[];

        self.submit = submit;
        self.getAlltasks = getAlltasks;
        self.createtask = createtask;
        self.updatetask = updatetask;
        self.removetask = removetask;
        self.edittask = edittask;
        self.reset = reset;
        self.searchtask = searchtask;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        self.alert = {};

        function loadingImg(){
        	
        	
        }
        function searchtask() {
            console.log('About to search task');
            if(!validateMandatoryFields()){
            	
           	 self.alert = {type: 'alert-danger',msg:'All fields are mandatory'};
        		showAlert();
        		return;
        		
           }
            TaskService.searchtask(self.task)
                .then(
                    function (response) {
                        console.log('task search successfully');
                        self.done = true;
                        self.getAlltasks();
                        console.log('status: '+self.task.status+' tasks: '+self.tasks.length);
                       if(self.tasks.length == 0 && self.task.status != ""){
                    	   self.alert = {type: 'alert-info',msg:'No Results Found.'};
                   		showAlert();
                    	   
                       }else{
                        hideAlert();
                       }
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating task');
                        self.errorMessage = 'Error while creating task: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }

       
        function submit() {
            console.log('Submitting');
           
            if(!validateMandatoryFields()){
            	
            	 self.alert = {type: 'alert-danger',msg:'All fields are mandatory'};
         		showAlert();
         		return;
         		
            }
            if (self.task.id === undefined || self.task.id === null) {
                console.log('Saving New task', self.task);
                createtask(self.task);
                hideAlert();
                
            } else {
                updatetask(self.task, self.task.id);
                hideAlert();
                console.log('task updated with id ', self.task.id);
            }
            
        }

        function createtask(task) {
            console.log('About to create task');
            TaskService.createtask(task)
                .then(
                    function (response) {
                        console.log('task created successfully');
                        self.successMessage = 'task created successfully';
                        self.errorMessage='';
                        self.alert = {type:'alert-success',msg:'Task created successfully'};
                        showAlert();
                        self.done = true;
                        self.task={};
                        
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating task');
                        self.errorMessage = 'Error while creating task: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updatetask(task, id){
            console.log('About to update task');
            TaskService.updatetask(task, id)
                .then(
                    function (response){
                        console.log('task updated successfully');
                        self.successMessage='task updated successfully';
                        self.errorMessage='';
                        self.alert = {type:'alert-success',msg:'Task updated successfully'};
                        showAlert();
                       
                        self.done = true;
                        self.task = null;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Error while updating task');
                        self.errorMessage='Error while updating task '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removetask(id){
            console.log('About to remove task with id '+id);
            TaskService.removetask(id)
                .then(
                    function(){
                        console.log('task '+id + ' removed successfully');
                        self.alert = {type:'alert-success',msg:'Task removed successfully'};
                        showAlert();
                       
                    },
                    function(errResponse){
                        console.error('Error while removing task '+id +', Error :'+errResponse.data);
                    }
                );
        }


        function getAlltasks(){
        	self.tasks = TaskService.getAlltasks();
            return self.tasks;
        }
       
        function edittask(id) {
            self.successMessage='';
            self.errorMessage='';
            TaskService.gettask(id).then(
                function (task) {
                    self.task = task;
                },
                function (errResponse) {
                    console.error('Error while removing task ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.task={};
            $scope.myForm.$setPristine(); //reset Form
        }
        function showAlert(){
            
             $(".alert").show();
         }
        function hideAlert(){
            
            $(".alert").hide();
        }
        function validateMandatoryFields(){
        	
        	if(myForm.project != undefined && myForm.project.value == "? undefined:undefined ?"){
        		return false;
        		
        	}if(myForm.status != undefined && myForm.status.value == "? undefined:undefined ?"){
        		return false;
        		
        	}if(myForm.assignee != undefined && myForm.assignee.value == "? undefined:undefined ?"){
        		return false;
        		
        	}if(myForm.startdate != undefined && myForm.startdate.value == ""){
        		return false;
        		
        	}if(myForm.enddate != undefined && myForm.enddate.value == ""){
        		return false;
        		
        	}if(myForm.taskdescription != undefined && myForm.taskdescription.value == ""){
        		return false;
        		
        	}if(myForm.fromdate != undefined && myForm.fromdate.value == ""){
        		return false;
        		
        	}if(myForm.todate != undefined && myForm.todate.value == ""){
        		return false;
        	}
        	return true;
        }
    }


    ]);