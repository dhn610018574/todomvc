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
				{id:3,name:'打豆豆',isCompleted:true}
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
			};

			//3.删除数据
			vm.del = function(id){
				for(var i = 0 ,length = todoList.length; i < length; i++){
					if( todoList[i].id === id ){
						todoList.splice(i,1);
						break;
					}
				}

			}
		};
	
}(angular);
