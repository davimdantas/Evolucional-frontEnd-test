"use strict";


angular.module("core.teacher").factory("Teacher",
    function($resource) {
        let teachers = $resource(
            "http://localhost:3005/get_all_teachers",
            {},
            {
                updateStudent: {
                    method: "POST",
                    // url: 'http://localhost:3005/update_student/:id/:name/:class/:degree',
                    url: 'http://localhost:3005/update_student/:id/:name/:class/:degree',
                    // headers:{'Content-Type':'application/json; charset=UTF-8'}, 
                    // data: {teacher: 'initial_state'},
                    isArray: false,
                },
                getStudent: {
                    method: "GET",
                    url: 'http://localhost:3005/get_student/:id',
                    isArray: false,
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

        return teachers;
        //Based on passed argument you can make a call to resource
        //and initialize more objects
        //$resource.getMeBond(007)
    }
);
