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
            $scope
        ) {
            this.query1 = this.query;
            this.query2 = this.query;
            this.teachers = Teacher.query();
            let teachers = this.teachers;
            this.matters = Matter.query();
            let matters = this.matters;
            this.classes = School_class.query();
            let classes = this.classes;
            this.degrees = Degree.query();
            let degrees = this.degrees;
            this.relationships = Relationship.query();
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

            this.degrees.$promise.then(function () {
                degrees.forEach(item => (degreesMap[item.id] = item.name));
            });

            this.matters.$promise.then(function () {
                matters.forEach(item => (mattersMap[item.id] = item.name));
            });

            this.classes.$promise.then(function () {
                classes.classes.forEach(
                    item => (classesMap[item.id] = item.name)
                );
            });

            this.teachers.$promise.then(function () {
                teachers.forEach(item => (teachersMap[item.id] = item.name));
            });

            this.relationships.$promise.then(function () {
                let empty_class_map = {}
                for (let i = 0; i < classes.classes.length; i++) {
                    const school_class = classes.classes[i];
                    empty_class_map[school_class.id] = {
                        name: school_class.name,
                        checked: false
                    };
                }
                for (let i = 0; i < relationships.length; i++) {
                    const relationship = relationships[i];
                    relationship.teacher_name =
                        teachersMap[relationship.teacherId];
                    relationship.matter_name =
                        mattersMap[relationship.matterId];
                    let degrees_map = {};
                    for (let j = 0; j < relationship.degrees.length; j++) {
                        const degree = relationship.degrees[j];
                        degree.degree_name = degreesMap[degree.degreeId];
                        let classes_names = "";
                        let classes_map = {};
                        for (let l = 0; l < degree.classes.length; l++) {
                            const school_class = degree.classes[l];
                            classes_names +=
                                classesMap[
                                school_class.classPosition ||
                                school_class.classId
                                ] + " ";
                            classes_map[
                                school_class.classPosition ||
                                school_class.classId
                            ] = {
                                    name:
                                        classesMap[
                                        school_class.classPosition ||
                                        school_class.classId
                                        ],
                                    checked: true
                                };
                        }
                        for (let i = 0; i < classes.classes.length; i++) {
                            const school_class = classes.classes[i];
                            if (!classes_map.hasOwnProperty(school_class.id))
                                classes_map[school_class.id] = {
                                    name: school_class.name,
                                    checked: false
                                };
                        }
                        degree.classes_names = classes_names;
                        degree.classes_map = classes_map;
                        degree.checked = true;
                        degrees_map[degree.degreeId] = degree;
                    }
                    for (let i = 0; i < degrees.length; i++) {
                        const degree = degrees[i];
                        if (!degrees_map.hasOwnProperty(degree.id))
                            degrees_map[degree.id] = {
                                classes: [],
                                classes_map: empty_class_map,
                                degree_name: degree.name,
                                checked: false
                            };
                    }
                    relationship.degree_map = degrees_map
                }
            });

            this.orderProp = "name";

            this.showStudents = function (id, name) {
                let modalInstance = $modal.open({
                    animation: false,
                    templateUrl:
                        "students-by-degree/students-by-degree.template.html",
                    controller: "studentByDegree",
                    size: "",
                    resolve: {
                        degree: function () {
                            return [id, name];
                        }
                    }
                });

                modalInstance.result.then(
                    function (response) {
                        if (!response) {
                        } else if (response) {
                            response.class_name = classesMap[response.classId];
                            response.degree_name =
                                degreesMap[response.degreeId];
                            angular.copy(response, initial_state);
                            let student_selected = Student.updateStudent(
                                {
                                    id: initial_state.id,
                                    name: initial_state.name,
                                    class: initial_state.classId,
                                    degree: initial_state.degreeId
                                },
                                initial_state,
                                function (response) { }
                            );
                        }
                    },
                    function () {
                        console.log("canceled");
                    }
                );
                //  });
            };

            this.createRelationship = function (
                degreesMap,
                mattersMap,
                classesMap,
                teachersMap,
                relationships,
                teachers,
                matters,
                classes
            ) {
                // let degreesMap = this.degreesMap;
                // console.log('degreesMap:', degreesMap)
                let modalInstance = $modal.open({
                    animation: false,
                    templateUrl:
                        "edit-relationship/edit-relationship.template.html",
                    controller: "EditRelationshipController",
                    size: "",
                    resolve: {
                        relationship_utils: function () {
                            return {
                                degreesMap: degreesMap,
                                mattersMap: mattersMap,
                                classesMap: classesMap,
                                teachersMap: teachersMap,
                                relationships: relationships,
                                teachers: teachers,
                                matters: matters,
                                classes: classes
                            };
                        }
                    }
                });

                modalInstance.result.then(
                    function (response) {
                        if (!response) {
                        } else if (response) {
                            response.class_name = classesMap[response.classId];
                            response.degree_name =
                                degreesMap[response.degreeId];
                            angular.copy(response, initial_state);
                            let student_selected = Student.updateStudent(
                                {
                                    id: initial_state.id,
                                    name: initial_state.name,
                                    class: initial_state.classId,
                                    degree: initial_state.degreeId
                                },
                                initial_state,
                                function (response) { }
                            );
                        }
                    },
                    function () {
                        console.log("canceled");
                    }
                );
                //  });
            };
        }
    ]
});
