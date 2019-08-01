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
            let label_char = [];
            let chart;

            this.students.$promise.then(function() {
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];
                    degrees_count[student.degreeId]++;

                    student.class_name = classesMap[student.classId];
                    student.degree_name = degreesMap[student.degreeId];
                }

                for (const key in degrees_count) {
                    if (degrees_count.hasOwnProperty(key)) {
                        const element = degrees_count[key];
                        degrees_distribution.push(element);
                    }
                }

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

                    for (const key in degrees_count) {
                        if (degrees_count.hasOwnProperty(key)) {
                            const element = degrees_count[key];
                            console.log("element:", element);
                            degrees_distribution.push(element);
                        }
                    }
                    chart.data;
                    chart.data.datasets[0].data = degrees_distribution;
                    chart.update();
                });
                this.students = creatingStudents;
            };

            this.editRecord = function(id) {
                let initial_state = id;
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
                                function(response) {}
                            );
                        }
                    },
                    function() {}
                );
            };
            this.orderProp = "name";
        }
    ]
});
