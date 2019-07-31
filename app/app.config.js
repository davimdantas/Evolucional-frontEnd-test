'use strict';

angular.
  module('frontEndTestApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/students', {
          template: '<student-list></student-list>'
        }).
        when('/teachers', {
          template: '<teacher-list></teacher-list>'
        }).
        when('/students/id', {
          template: '<edit-student></edit-student>'
        }).
        otherwise('/students');
    }
  ]);
