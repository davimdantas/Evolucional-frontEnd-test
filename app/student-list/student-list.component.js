"use strict";

// Register `studentList` component, along with its associated controller and template
angular.module("studentList").component("studentList", {
    templateUrl: "student-list/student-list.template.html",
    controller: [
        "Student",
        "School_class",
        "Degree",
        "$uibModal",
        function StudentListController(
            Student,
            School_class,
            Degree,
            $modal,
            $scope
        ) {
            this.classes = School_class.query();
            // console.log('this.classes:', this.classes)
            // this.students = Student[0].query();
            this.degrees = Degree.query();
            this.students = Student.query();
            let students = this.students;
            let classes = this.classes;
            let degrees = this.degrees;

            this.students.$promise.then(function() {
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];
                    for (let i = 0; i < classes.classes.length; i++) {
                        const class_object = classes.classes[i];
                        if (class_object.id == student.classId) {
                            student.class_name = class_object.name;
                            break;
                        }
                    }
                    for (let i = 0; i < degrees.length; i++) {
                        const degree = degrees[i];
                        if (degree.id == student.degreeId) {
                            student.degree_name = degree.name;
                            break;
                        }
                    }
                }
            });

            this.editRecord = function(id) {
                let initial_state = angular.copy(id);
                console.log("idssssss:", id);
                //    $http.get("/demos/api/v1/employees/?id="+id)
                //  .then(function(response){
                let modalInstance = $modal.open({
                    animation: false,
                    templateUrl: "edit-student/edit-student.template.html",
                    controller: "EditStudentController",
                    size: "",
                    resolve: {
                            student: initial_state
                    },
                    reponse: {

                    }
                });

                modalInstance.result.then(
                    function(response) {
                        if (!response) {
                            console.log('id antigo:', id)
                        } else if ( response == 'update') {
                            console.log('initial_state antigo:', initial_state)
                            let student_selected = Student.updateStudent({id: initial_state.id, name: initial_state.name, class: initial_state.classId, degree: initial_state.degreeId
                            }, initial_state, function(response) {
                                console.log('response:', response)
                                console.log('this.student_selected:', student_selected)
                                 id = response   
                            });
                        }
                    },
                    function() {
                        console.log("canceled");
                    }
                );
                //  });
            };

            this.otherFunction = function() {
                console.log("otherFunction");
                //DO SOME STUFF
                //....
                //THEN CLOSE MODAL HERE
                modalInstance.close();
            };

            // this.students = function() {
            //     //This function is sort of private constructor for controller
            //     let students_querry = Student.query();
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
