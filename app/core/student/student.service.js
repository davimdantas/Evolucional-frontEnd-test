"use strict";


angular.module("core.student").factory("Student",
    function($resource) {
        let students = $resource(
            "http://localhost:3005/get_all_students",
            {},
            {
                updateStudent: {
                    method: "POST",
                    // url: 'http://localhost:3005/update_student/:id/:name/:class/:degree',
                    url: 'http://localhost:3005/update_student/:id/:name/:class/:degree',
                    // headers:{'Content-Type':'application/json; charset=UTF-8'}, 
                    // data: {student: 'initial_state'},
                    isArray: false,
                },
                getStudent: {
                    method: "GET",
                    url: 'http://localhost:3005/get_student/:id',
                    isArray: false,
                },
                getStudentsByDegree: {
                    method: "GET",
                    url: 'http://localhost:3005/get_students_by_degree/:id',
                    isArray: true,
                },
                creatN: {
                    method: "GET",
                    url: 'http://localhost:3005/createStudents',
                    isArray: true,
                },
                query: {
                    method: "GET",
                    // params: {studentId: 'students'},
                    isArray: true
                },
                'save': {
                    method: 'POST', 
                    cache: false,
                    url: 'http://localhost:3005/update_student',
                    isArray:false,
                    headers:{'Content-Type':'application/json; charset=UTF-8'} 
                }
            }
        );

        return students;
    }
);
