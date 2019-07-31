'use strict';

angular.
  module('core.degree').
  factory('Degree', ['$resource',
    function($resource) {
      // return $resource('assets/classes/:id', {}, {
      return $resource('http://localhost:3005/get_all_degrees', {}, {
        query: {
          method: 'GET',
          // params: {id: 'id'},
          isArray: true
        }
      });
    }
  ]);
