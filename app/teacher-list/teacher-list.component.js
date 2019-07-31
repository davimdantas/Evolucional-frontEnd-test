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

            // console.log('teachers:', teachers)
            // console.log('classes:', classes)
            // this.classessMap = {};
            console.log("degreesMap:", this.degreesMap);
            // classes.classes.forEach(item => (classessMap[item.id] = item.name));

            // this.teachers.$promise.then(function() {
            //     relationships.$promise.then(function() {
            //         for (let i = 0; i < teachers.length; i++) {
            //             const teacher = teachers[i];
            //             for (
            //                 let index = 0;
            //                 index < relationships.length;
            //                 index++
            //             ) {
            //                 const relationship = relationships[index];
            //                 // console.log('relationship:', relationship)
            //                 if (teacher.id == relationship.teacherId) {
            //                     teacher.degress = relationship.degrees;
            //                     teacher.matterId = relationship.matterId;
            //                     break;
            //                 }
            //             }
            //             // console.log('teacher:', teacher)
            //         }
            //     });
            // });

            // this.editRecord = function(id) {

            //     // let initial_state = angular.copy(id);
            //     // let initial_state = angular.copy(id);
            //     let initial_state = id;
            //     console.log("idssssss:", id);
            //     //    $http.get("/demos/api/v1/employees/?id="+id)
            //     //  .then(function(response){
            //     let modalInstance = $modal.open({
            //         animation: false,
            //         templateUrl: "edit-student/edit-student.template.html",
            //         controller: "EditStudentController",
            //         size: "",
            //         resolve: {
            //             student: angular.copy(initial_state)
            //         }
            //     });

            //     modalInstance.result.then(
            //         function(response) {
            //             if (!response) {
            //                 console.log("id antigo:", id);
            //             } else if (response) {
            //                 angular.copy(response, initial_state)
            //                 console.log("initial_state antigo:", initial_state);
            //                 let student_selected = Teacher.updateStudent(
            //                     {
            //                         id: initial_state.id,
            //                         name: initial_state.name,
            //                         class: initial_state.classId,
            //                         degree: initial_state.degreeId
            //                     },
            //                     initial_state,
            //                     function(response) {
            //                         console.log("response:", response);
            //                         console.log(
            //                             "this.student_selected:",
            //                             student_selected
            //                         );
            //                     }
            //                 );
            //             }
            //         },
            //         function() {
            //             console.log("canceled");
            //         }
            //     );
            //     //  });
            // };

            // this.teachers = function() {
            //     //This function is sort of private constructor for controller
            //     let students_querry = Teacher.query();
            //     console.log("id:", id);
            //     console.log("class:", this.classes.classes);
            //     for (let i = 0; i < students_querry.length; i++) {
            //         const student = students_querry[i];
            //         for (let i = 0; i < this.classes.classes.length; i++) {
            //             const element = this.classes.classes[i];
            //             console.log("element.name:", element.name);
            //             if (element.id == student.classId) {
            //                 student.class_name = element.name;
            //                 break;
            //             }
            //         }
            //     }

            //     return students_querry;
            //     //Based on passed argument you can make a call to resource
            //     //and initialize more objects
            //     //$resource.getMeBond(007)
            // };
            this.orderProp = "name";
            // this.class_Name = function(id) {
            //     //This function is sort of private constructor for controller
            //     console.log("id:", id);
            //     console.log("class:", this.classes.classes);
            //     let name;
            //     for (let i = 0; i < this.classes.classes.length; i++) {
            //         const element = this.classes.classes[i];
            //         console.log("element.name:", element.name);
            //         if (element.id == id) {
            //             name = element.name;
            //             break;
            //         }
            //     }

            //     return name;
            //     //Based on passed argument you can make a call to resource
            //     //and initialize more objects
            //     //$resource.getMeBond(007)
            // };
        }
    ]
});
