"use strict";

angular
    .module("core.relationship")
    .factory("Relationship", function($resource) {
        let relationship = $resource(
            "http://localhost:3005/get_all_relationships",
            {},
            {
                updateRelationship: {
                    method: "POST",
                    // url: 'http://localhost:3005/update_student/:id/:name/:class/:degree',
                    url: "http://localhost:3005/update_relationship",
                    transformRequest: angular.identity,
                    // headers: { "Content-Type": undefined },
                    headers: { "Content-Type": 'application/json' },
                    
                    // headers:{'Content-Type':'application/json; charset=UTF-8'},
                    // data: {student: 'initial_state'},
                    isArray: true
                },
                query: {
                    method: "GET",
                    // params: {studentId: 'students'},
                    isArray: true
                },

                save: {
                    url: "http://localhost:3005/update_relationship",
                    method: "POST",
                    isArray: false,
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity
                }
            }
        );

        return relationship;
    });
