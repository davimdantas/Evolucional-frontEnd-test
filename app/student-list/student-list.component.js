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
            let classes = this.classes;
            // console.log('this.classes:', this.classes)
            // this.students = Student[0].query();
            // $scope.queryBy = '$';
            this.query1 = this.query;
            this.query2 = this.query;
            this.degrees = Degree.query();
            let degrees = this.degrees;
            this.students = Student.query();
            
            this.degreesMap = {};
            let degreesMap = this.degreesMap;
            this.classesMap = {};
            let classesMap = this.classesMap;

            this.degrees.$promise.then(function() {
                degrees.forEach(item => (degreesMap[item.id] = item.name));
            });
            this.classes.$promise.then(function() {
                classes.classes.forEach(
                    item => (classesMap[item.id] = item.name)
                );
            });

            let students = this.students;
            let degrees_count = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0
            };
            let degrees_distribution = [];
            // for (let i = 0; i < this.students.length; i++) {
            //     const student = this.students[i];
            //     console.log('degrees_coun :', degrees_count[student.degreeId] )
            //     degrees_count[student.degreeId]  ++
            // }
            //   this.createStudents() = function() {
            //       console.log('chamou')
            //         this.teste = Student.creatN()
            //         console.log('this.teste:', this.teste)
            // }
            let label_char = [];
            let chart;

            this.students.$promise.then(function() {
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];

                    console.log(
                        "degrees_coun :",
                        degrees_count[student.degreeId]
                    );
                    degrees_count[student.degreeId]++;

                    student.class_name = classesMap[student.classId];
                    student.degree_name = degreesMap[student.degreeId];
                    // for (let i = 0; i < classes.classes.length; i++) {
                    //     const class_object = classes.classes[i];
                    //     if (class_object.id == student.classId) {
                    //         break;
                    //     }
                    // }
                    // for (let i = 0; i < degrees.length; i++) {
                    //     const degree = degrees[i];
                    //     if (degree.id == student.degreeId) {
                    //         student.degree_name = degree.name;
                    //         break;
                    //     }
                    // }
                }

                console.log("degrees_count:", degrees_count);

                for (const key in degrees_count) {
                    if (degrees_count.hasOwnProperty(key)) {
                        const element = degrees_count[key];
                        console.log("element:", element);
                        degrees_distribution.push(element);
                    }
                }
                console.log("degrees_distribution:", degrees_distribution);

                

                for (let i = 0; i < degrees.length; i++) {
                    label_char.push(degrees[i].name);
                }

                var ctx = document.getElementById("myChart").getContext("2d");
                chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: "bar",

                    // The data for our dataset
                    data: {
                        labels: label_char,
                        datasets: [
                            {
                                label: "My First dataset",
                                backgroundColor: "rgb(255, 99, 132)",
                                borderColor: "rgb(255, 99, 132)",
                                data: degrees_distribution
                            }
                        ]
                    },

                    // Configuration options go here
                    options: {}
                });
            });

            this.createStudents = function() {
                let creatingStudents = Student.creatN();
                degrees_count = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                    9: 0,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 0
                };
                degrees_distribution = [];

                creatingStudents.$promise.then(function() {

                    for (let i = 0; i < creatingStudents.length; i++) {
                        const student = creatingStudents[i];
                        degrees_count[student.degreeId]++;
                        student.class_name = classesMap[student.classId];
                        student.degree_name = degreesMap[student.degreeId];
                    }
    
                    console.log("degrees_count:", degrees_count);
    
                    for (const key in degrees_count) {
                        if (degrees_count.hasOwnProperty(key)) {
                            const element = degrees_count[key];
                            console.log("element:", element);
                            degrees_distribution.push(element);
                        }
                    }
                    console.log("degrees_distribution:", degrees_distribution);
                    chart.data
                    console.log('chart.data:', chart.data.datasets[0])
                    chart.data.datasets[0].data = degrees_distribution
    
                    
                    chart.update()
                 
                })
                this.students = creatingStudents;

               
               
            };

            this.editRecord = function(id) {
                // let initial_state = angular.copy(id);
                // let initial_state = angular.copy(id);
                let initial_state = id;
                console.log("idssssss:", id);
                //    $http.get("/demos/api/v1/employees/?id="+id)
                //  .then(function(response){
                let modalInstance = $modal.open({
                    animation: false,
                    templateUrl: "edit-student/edit-student.template.html",
                    controller: "EditStudentController",
                    size: "",
                    resolve: {
                        student: angular.copy(initial_state)
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
