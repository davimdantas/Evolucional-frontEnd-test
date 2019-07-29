'use strict';

angular.
  module('core.school_class').
  factory('School_class', ['$resource',
    function($resource) {
      // return $resource('assets/classes/:id', {}, {
      return $resource('assets/classes.json', {}, {
        query: {
          method: 'GET',
          // params: {id: 'id'},
          // isArray: true
        }
      });
    }
  ]);
