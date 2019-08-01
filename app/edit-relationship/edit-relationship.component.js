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
    
    



    $scope.updateRelationships = function() {
        // console.log('this.student.name:', this.student.name)
     
            $scope.$close($scope.relationship_map);
        
    };

    $scope.cancelModal = function() {
        $scope.$close();
    };
});

