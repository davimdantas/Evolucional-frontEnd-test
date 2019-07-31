"use strict";


angular.module("core.relationship").factory("Relationship",
    function($resource) {
        let relationship = $resource(
            "http://localhost:3005/get_all_relationships",
            {},
            {
                query: {
                    method: "GET",
                    // params: {studentId: 'students'},
                    isArray: true
                }
            }
        );

        return relationship;
    }
);
