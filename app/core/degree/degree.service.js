'use strict';

angular.
  module('core.degree').
  factory('Degree', ['$resource',
    function($resource) {
      // return $resource('assets/classes/:id', {}, {
      return $resource('assets/degrees.json', {}, {
        query: {
          method: 'GET',
          // params: {id: 'id'},
          isArray: true
        }
      });
    }
  ]);
