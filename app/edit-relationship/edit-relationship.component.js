"use strict";

// Register `editRelationship` component, along with its associated controller and template
let editRelationship = angular
    .module("editRelationship")
    .component("editRelationship", {
        templateUrl: "edit-relationship/edit-relationship.template.html",
        controller: [
            "Student",
            "School_class",
            "Degree",
            "Relationship",
            "$uibModal",
            function EditRelationshipController(
                Student,
                School_class,
                Degree,
                Relationship
            ) {
                this.orderProp = "name";
            }
        ]
    });

editRelationship.controller("EditRelationshipController", function(
    // Student,
    // School_class,
    // Degree,
    $scope,
    relationship_utils
) {
    // console.log(' $scope:',  $scope)
    $scope.orderProp = "name";

    $scope.degreesMap = relationship_utils.degreesMap;
    $scope.mattersMap = relationship_utils.mattersMap;
    $scope.classesMap = relationship_utils.classesMap;
    $scope.teachersMap = relationship_utils.teachersMap;
    $scope.relationships = relationship_utils.relationships;
    $scope.matters = relationship_utils.matters;
    $scope.teachers = relationship_utils.teachers;
    $scope.classes = relationship_utils.classes;
    $scope.degrees = relationship_utils.degrees;
    $scope.relationship_map = relationship_utils.relationship_map;
    console.log('$scope.degrees:', $scope.degrees)
    // $scope.relationship_map = {};
    // $scope.relationships.forEach(item => ($scope.relationship_map[item.teacherId] = item));

    
    $scope.teacher_selected = {
        id: "",
        name: ""
    };
    $scope.matter_selected = {
        id:  "",
        name:""
    };

    $scope.setMatter = function() { 
        console.log('chamado')
        $scope.matter_selected = {
            id:  $scope.relationship_map[$scope.teacher_selected.id] ?  $scope.relationship_map[$scope.teacher_selected.id].matterId ? $scope.relationship_map[$scope.teacher_selected.id].matterId : null : "",
            name:  $scope.relationship_map[$scope.teacher_selected.id] ?  $scope.relationship_map[$scope.teacher_selected.id].matter_name ?  $scope.relationship_map[$scope.teacher_selected.id].matter_name : null :  ""
        };
    }
    $scope.setClasss = function() { 
        console.log('event:', event)
      
    }
    
    // $scope.isChecked = function(classId, classes_map) { 
    //     console.log('classes:', classes_map)
    //     console.log('classId:', classId)
    //     return classes_map.hasOwnProperty(classId) 
      
    // }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        console.log('relationship_map:', $scope.relationship_map)
    




















    // $scope.classes = School_class.query();
    // $scope.classes.$promise.then(function() {
    //     $scope.classes = $scope.classes.classes;
    //     console.log("student:", student);
    //     $scope.class_selected = {
    //         id: student.classId,
    //         name: student.class_name
    //     };
    // });

    // $scope.degrees = Degree.query();
    // $scope.degrees.$promise.then(function() {
    //     // console.log("$scope.degrees :", $scope.degrees);
    //     // console.log("student:", student);
    //     $scope.degree_selected = {
    //         id: student.degreeId,
    //         name: student.degree_name
    //     };
    // });

    // $scope.student = student;

    $scope.updateRelationships = function() {
        // console.log('this.student.name:', this.student.name)
        if (!angular.isDefined(this.student.name) || this.student.name === "") {
            alert("student name is empty");
        }
        // this.updateRecord(this.student);
        else {
            student.classId = $scope.class_selected.id;
            student.degreeId = $scope.degree_selected.id;
            console.log("student agora:", student);
            $scope.$close(student);
        }
    };

    $scope.cancelModal = function() {
        $scope.$close();
    };
});
// editRelationship.controller('updateEmpCtrl',  ['$scope', '$http', 'student', function($scope, $http, student) {
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
