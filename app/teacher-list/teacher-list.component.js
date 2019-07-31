"use strict";

// Register `teacherList` component, along with its associated controller and template
angular.module("teacherList").component("teacherList", {
    templateUrl: "teacher-list/teacher-list.template.html",
    controller: [
        "Teacher",
        "School_class",
        "Degree",
        "Relationship",
        "Matter",
        "$uibModal",
        function StudentListController(
            Teacher,
            School_class,
            Degree,
            Relationship,
            Matter,
            $modal,
            $scope,
        ) {
            this.query1 = this.query;
            this.query2 = this.query;
            this.teachers =  Teacher.query();
            let teachers = this.teachers;
            this.matters =  Matter.query();
            let matters = this.matters;
            this.classes =  School_class.query();
            let classes = this.classes;
            this.degrees =  Degree.query();
            let degrees = this.degrees;
            this.relationships =  Relationship.query();
            let relationships = this.relationships;

            this.degreesMap = {};
            let degreesMap = this.degreesMap;
            this.mattersMap = {};
            let mattersMap = this.mattersMap;
            this.classesMap = {};
            let classesMap = this.classesMap;
            this.teachersMap = {};
            let teachersMap = this.teachersMap;

            // $q.all([
            //     doQuery('billing'),
            //     doQuery('shipping')
            //  ]).then(function(data) { 

            //  })            

            this.degrees.$promise.then(function() {
                degrees.forEach(item => (degreesMap[item.id] = item.name));
            });

            this.matters.$promise.then(function() {
                matters.forEach(item => (mattersMap[item.id] = item.name));
            });

            this.classes.$promise.then(function() {
                classes.classes.forEach(
                    item => (classesMap[item.id] = item.name)
                );
            });

            this.teachers.$promise.then(function() {
                teachers.forEach(item => (teachersMap[item.id] = item.name));
            });

            this.relationships.$promise.then(function() {
                for (let i = 0; i < relationships.length; i++) {
                    const relationship = relationships[i];
                    relationship.teacher_name =
                        teachersMap[relationship.teacherId];
                    console.log('mattersMap:', mattersMap)
                    relationship.matter_name = mattersMap[relationship.matterId];
                    for (let j = 0; j < relationship.degrees.length; j++) {
                        const degree = relationship.degrees[j];
                        console.log('degree:', degree)
                        degree.degree_name = degreesMap[degree.degreeId];
                        let classes_names = ''
                        for (let l = 0; l < degree.classes.length; l++) {
                            const school_class = degree.classes[l];
                            classes_names += classesMap[school_class.classPosition || school_class.classId] + ' ';
                        }
                        degree.classes_names = classes_names;
                    }
                }
                console.log('relationship:', relationships)
            });

      
            this.orderProp = "name";


            this.showStudents = function(id, name) {
                let modalInstance = $modal.open({
                    animation: false,
                    templateUrl: "students-by-degree/students-by-degree.template.html",
                    controller: "studentByDegree",
                    size: "",
                    resolve: {
                        degree : function () {
                            return [id, name];
                        }
                    }
                });

                modalInstance.result.then(
                    function(response) {
                        if (!response) {
                        } else if (response) {
    
                            response.class_name = classesMap[response.classId];
                            response.degree_name = degreesMap[response.degreeId];
                            angular.copy(response, initial_state);
                            let student_selected = Student.updateStudent(
                                {
                                    id: initial_state.id,
                                    name: initial_state.name,
                                    class: initial_state.classId,
                                    degree: initial_state.degreeId,
                                },
                                initial_state,
                                function(response) {
                                  
                                }
                            );
                        }
                    },
                    function() {
                        console.log("canceled");
                    }
                );
                //  });
            };

         
        }
    ]
});
