"use strict";


angular.module("core.matter").factory("Matter",
    function($resource) {
        let matter = $resource(
            "http://localhost:3005/get_all_matters",
            {},
            {
                query: {
                    method: "GET",
                    // params: {studentId: 'students'},
                    isArray: true
                }
            }
        );

        return matter;
    }
);
