var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http', function($scope,$http) {
	var refresh = function() {
		$http.get('/contactlist').then(doneCallbacks, failCallbacks);
		function doneCallbacks(res) {
			console.log("Data received");
			$scope.contactlist = res.data;
			$scope.contact = {};
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
	
	refresh();
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).then(sucessCallbacks, failCallbacks);
		function sucessCallbacks(res) {
			console.log(res.data);
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	 }
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).then(successCallbacks, failCallbacks);
		function successCallbacks(res) {
			console.log(res.data);
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).then(function(response) {
			$scope.contact = response.data;
		});
	}
	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
			refresh();
		});
	}
	$scope.deselect = function() {
		$scope.contact = "";
	}
	}]);
