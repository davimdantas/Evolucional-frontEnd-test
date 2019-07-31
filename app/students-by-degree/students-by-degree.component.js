"use strict";

// Register `studentByDegree` component, along with its associated controller and template
let studentByDegree = angular.module("studentByDegree").component("studentByDegree", {
    templateUrl: "students-by-degree/students-by-degree.template.html",
    controller: [
        "Student",
        "School_class",
		"Degree",
		'$uibModal',
        function studentByDegree(Student, School_class, Degree) {
            this.orderProp = "name";
        }
    ]
});

studentByDegree.controller("studentByDegree" , function(
    Student,
    School_class,
    Degree,
	$scope,
	degree,
) {
    $scope.orderProp = "name";
    console.log('degree:', degree)
    $scope.degree_name = degree[1];
    $scope.degreeId = degree[0];

    $scope.classesMap = {};
    // $scope.degreesMap = {};

    // $scope.degrees = Degree.query();
    // $scope.degrees.$promise.then(function() {
    //     $scope.degrees.forEach(
    //         item => ($scope.degreesMap[item.id] = item.name)
    //     );
    // });
    
    $scope.classes = School_class.query();
    $scope.classes.$promise.then(function() {
        $scope.classes.classes.forEach(
            item => ($scope.classesMap[item.id] = item.name)
        );
	});
	
    console.log('$scope.degreeId:', $scope.degreeId)
    $scope.students = Student.getStudentsByDegree({id:  $scope.degreeId});
    $scope.students.$promise.then(function() {
        console.log('$scope.students:', $scope.students)
        for (let i = 0; i < $scope.students.length; i++) {
            const student = $scope.students[i];
            student.class_name = $scope.classesMap[student.classId];
            // student.degree_name = $scope.degreesMap[student.degreeId];
        }
	});

    $scope.cancelModal = function() {
		$scope.$close()
    };
});

