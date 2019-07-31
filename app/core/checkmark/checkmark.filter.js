"use strict";

// angular.
//   module('core').
//   filter('checkmark', function() {
//     return function(input) {
//       return input ? '\u2713' : '\u2718';
//     };
//   });

let custom_filter = angular.module("core");

custom_filter.filter("Demofilter", function() {
    return function(input, map) {
        try {
          let classes = '';
          for (let i = 0; i < input.length; i++) {
            const school_class = input[i];
            classes += map[school_class.classPosition || school_class.classId] + ' '
          }
         
            return classes;
        } catch (err) {
            throw "Translation not loaded yet, trying again...";
        }
   
    };
});
