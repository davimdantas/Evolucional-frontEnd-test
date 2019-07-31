'use strict';

angular.
  module('core.school_class').
  factory('School_class', ['$resource',
    function($resource) {
      // return $resource('assets/classes/:id', {}, {
      return $resource('http://localhost:3005/get_all_classes', {}, {
        query: {
          method: 'GET',
          // params: {id: 'id'},
          // isArray: true
        }
      });
    }
  ]);
