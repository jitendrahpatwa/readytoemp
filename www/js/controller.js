angular.module("readytoemployee.controllers",[])
.controller('HomeCtrl',function($scope,$state){
	console.log('in home ctrl');
	$scope.proceed = function(){
		$state.go('app.browse');
	}
})
.controller('SideMenuCtrl',function($scope,$state,$ionicModal){
	console.log('in SideMenu ctrl');
	///////////////about
	$scope.about = function(){
		$state.go('app.about');
	};
	/////end

	///////////////contact
	$scope.contact = function(){
		$state.go('app.contact');
	};
	/////end
	
	///////////////modal developers
	$ionicModal.fromTemplateUrl('views/dev.html',{
		scope:$scope
	}).then(function(modal){
		$scope.modal = modal;
	});
	$scope.developers = function(){
		$scope.modal.show();
	};
	$scope.closeDev = function(){
		$scope.modal.hide();
	};
	//////end

	$scope.proceed = function(){
		$state.go('app.browse');
	}
})
.controller('browseCotroller',function($scope,$cordovaSQLite){
	console.log('in browseCotroller ctrl');
	alert(localStorage.getItem("ready-name"));
	$scope.clicked = function(){
	var db = $cordovaSQLite.openDB({name:"readytoemployee.db"});
	//var db = $cordovaSQLite.openDB({name:"readytoemployee.db",bgType:1});
	$cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS users(id integer primary key AUTOINCREMENT,name text,email text,age integer)");
	var query = "INSERT INTO users(name,email,age) VALUES (?,?)";
	$cordovaSQLite.execute(db,query,['devendra','devendra.ahirwar3@gmail.com','23'])
	.then(function(success){
		alert("insert to "+success.insertId);
		$cordovaSQLite.execute(db,"SELECT * FROM users orderby ?",['name'])
		.then(function(res){
			for(var i=0;i<res.rows.length;i++){

				alert("From for loop:"+res.rows.item(0).name+" "+res.rows.item(0).email+" "+res.rows.item(0).age);	
			}
			alert("out of for loop:"+res.rows.item(0).name+" "+res.rows.item(0).email+" "+res.rows.item(0).age);
		},function(err){
			alert("not selected");
		});
	},function(error){
		alert("not inserted");
	});
	console.info("db is:"+db);
	};
})