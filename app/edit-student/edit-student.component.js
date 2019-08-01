"use strict";

// Register `editStudent` component, along with its associated controller and template
let editStudent = angular.module("editStudent").component("editStudent", {
    templateUrl: "edit-student/edit-student.template.html",
    controller: [
        "Student",
        "School_class",
		"Degree",
		'$uibModal',
        function EditStudentController(Student, School_class, Degree) {
            this.orderProp = "name";
        }
    ]
});

editStudent.controller("EditStudentController" , function(
    Student,
    School_class,
    Degree,
	$scope,
	student,
) {
    $scope.orderProp = "name";
    $scope.classes = School_class.query();
    $scope.classes.$promise.then(function() {
        $scope.classes = $scope.classes.classes;
        $scope.class_selected = {
            id: student.classId,
            name: student.class_name
        };
	});
	
    $scope.degrees = Degree.query();
    $scope.degrees.$promise.then(function() {
        $scope.degree_selected = {
            id: student.degreeId,
            name: student.degree_name
        };
	});

	$scope.student = student;
	
	$scope.updateStudent = function() {
        if (
			!angular.isDefined(this.student.name) ||
            this.student.name === ""
        ) {
			alert("student name is empty");
		}
		// this.updateRecord(this.student);
		else { 
			student.classId = $scope.class_selected.id
			student.degreeId = $scope.degree_selected.id
			$scope.$close(student);
		}
		};
	
	
    $scope.cancelModal = function() {
		$scope.$close()
    };
});
