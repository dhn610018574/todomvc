!function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope','$location',TodoController]);

		function TodoController($scope,$location){
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
				if(vm.taskName.trim() === '') {return;}
				var id;
				if(todoList.length === 0 ) {id = 1;}
				else {id = todoList[ todoList.length - 1 ].id + 1;}
				
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
			};

			//4.修改任务
			// 数据双向绑定，处理editingId即可
			// 确定是否添加editing类，判断todo.id === editingId是否成立
			vm.editingId = 0;
			vm.edit = function(id){
				vm.editingId = id;
			}
			//更新数据
			vm.update = function(){
				vm.editingId = 0;
			};

			// 5.切换任务选择状态（单个或者批量）
			// 单个的已经通过数据绑定实现了，只需要批量的
			vm.isCheckAll = false;
			vm.checkAll = function(){
				todoList.forEach(function(todo){
					todo.isCompleted = vm.isCheckAll;
				});
			};
			//6.清除已完成任务
			vm.clearCompleted = function(){
				var tempArr = [];
				for(var i = 0; i < todoList.length; i++){
					var todo = todoList[i];
					if(!todo.isCompleted){
						tempArr.push(todo);
					}
				}
				vm.todoList = tempArr;
				todoList = vm.todoList;
				// vm.todoList.length = 0;
				// [].push.apply(todoList,tempArr);
			};
			// 清除任务按钮的显示与隐藏
			vm.isShow = function(){
				return todoList.some(function(todo){
					if(todo.isCompleted) return true;
				})
			};
			//7.显示未完成的任务数
			vm.getUnCompletedCount = function(){
				var count = 0;
				todoList.forEach(function(todo){
					if( !todo.isCompleted ){
						count++;
					}
				});
				return count;
			};
			// 8.显示不同状态的任务，任务高亮
			vm.status = undefined;
			// vm.showAll = function(){
			// 	vm.status = undefined;
			// };
			// vm.showActive = function(){
			// 	vm.status = false;
			// };
			// vm.showCompleted = function(){
			// 	vm.status = true;
			// };
			// 9 根据URL变化显示相应任务
			vm.$location = $location;
			vm.$watch('$location.url()',function(curVal){
				switch(curVal) {
					case '/active':
					vm.status = false;
					break;
					case '/completed':
					vm.status = true;
					break;
					default :
					vm.status = undefined;
					break;
				}
			})

		}
	
}(angular);
