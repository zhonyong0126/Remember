angular
	.module("remember.task")
	.controller("CreateTaskController", CreateTaskController);

CreateTaskController.$inject = ["$scope", "$location", "taskDataService", "categories", "tags"];

function CreateTaskController($scope, $location, taskDataService, categories, tags){
    $scope.mdEditorOptions = mdEditorOptions;
    
    $scope.categoryInfo = {
            "categories": categories["categories"], 
    };
    
    $scope.tagInfo = {
        "tags": tags["tags"],
        "selection": [],
        "toggleSelection": function(tag){

            var idx = this.selection.indexOf(tag);
            if (idx > -1) {
                this.selection.splice(idx, 1);
            }
            else {
                this.selection.push(tag);
            }
            console.log(this.selection);
        }
    };
    
    $scope.dimensions =dimensions;

    $scope.createTask = function(){
        $scope.task.tags = $scope.tagInfo.selection;
        $scope.task.dimension = $scope.task.dimension.id;
        
        taskDataService.save($scope.task).$promise.then(
            function(response){
                $location.path("/view/" + response["task"].id);
            },
            function(){
                alert("fail to update task");
            }
        );
    };
    
    $scope.cancel = function(){
        $location.path("/");
    };
    
}