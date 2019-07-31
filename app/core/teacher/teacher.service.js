"use strict";

angular.module("core.teacher").factory("Teacher", function($resource) {
    let teachers = $resource(
        "http://localhost:3005/get_all_teachers",
        {},
        {
            query: {
                method: "GET",
                // params: {studentId: 'students'},
                isArray: true
            }
        }
    );

    return teachers;
});
