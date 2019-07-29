var app = angular.module('putserviceApp', []);

app.controller('putserviceCtrl', function ($scope, $http) {

// Simple Put request example:

var url = 'http://localhost:3005/update_student', data = 'parameters',config='contenttype';

$http.put(url, data, config).then(function (response) {

// This function handles success

}, function (response) {

// this function handles error

});

});