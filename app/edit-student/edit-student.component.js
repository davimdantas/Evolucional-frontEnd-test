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
            // this.classes = School_class.query();
            // classes = this.classes
            // this.classes.$promise.then(function() {
            // 	console.log('classes:', classes)

            // });

            // console.log("this.classes:", this.classes);
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
    // console.log(' $scope:',  $scope)
    $scope.orderProp = "name";

    $scope.classes = School_class.query();
    $scope.classes.$promise.then(function() {
        $scope.classes = $scope.classes.classes;
        console.log("student:", student);
        $scope.class_selected = {
            id: student.classId,
            name: student.class_name
        };
	});
	
    $scope.degrees = Degree.query();
    $scope.degrees.$promise.then(function() {
        // console.log("$scope.degrees :", $scope.degrees);
        // console.log("student:", student);
        $scope.degree_selected = {
            id: student.degreeId,
            name: student.degree_name
        };
	});

	$scope.student = student;
	
	$scope.updateStudent = function() {
		// console.log('this.student.name:', this.student.name)
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
			console.log('student agora:', student)
			$scope.$close(student);
		}
		};
	
	
    $scope.cancelModal = function() {
		$scope.$close()
    };
});
// editStudent.controller('updateEmpCtrl',  ['$scope', '$http', 'student', function($scope, $http, student) {
// 	$scope.employee = {};
// 	function init(){
// 		$scope.employee.name = student.name;
// 		$scope.employee.classId = student.employee_age;
// 		$scope.employee.degreeId = student.employee_salary;
// 		$scope.employee.id = student.id;
//     }
// 	$scope.updateEmp = function () {
// 		$scope.cancelModal();
// 		if(!angular.isDefined($scope.employee.name) || $scope.employee.name === '') {
//                 alert('employee name is empty');
//                 return;
//             }
//             else if(!angular.isDefined($scope.employee.classId) || $scope.employee.classId === '') {
//                 alert('employee classId is empty');
//                 return;
//             }else if(!angular.isDefined($scope.employee.degreeId) || $scope.employee.degreeId === '') {
//                 alert('employee degreeId is empty');
//                 return;
//             }
// 		$scope.updateRecord($scope.employee);
// 	}
// 	init();

// }]);
