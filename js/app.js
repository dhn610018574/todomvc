!function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope',TodoController]);

		function TodoController($scope){
			var vm = $scope;
			// 1、展示任务列表
			var todoList = [
				{id:1,name:'吃饭',isCompleted:false},
				{id:2,name:'睡觉',isCompleted:false},
				{id:3,name:'打豆豆',isCompleted:false}
			];
			vm.todoList = todoList;
			//2.添加任务
			vm.taskName = '';
			vm.add = function(){
				if(vm.taskName.trim() === '') return;
				var id;
				if(todoList.length === 0 ){
					id = 1;
				}else{
					id = todoList[ todoList.length - 1 ].id + 1;
				}
				todoList.push({id:id,name:vm.taskName,isCompleted:false});
				vm.taskName = '';
			}

		}
	
}(angular);
