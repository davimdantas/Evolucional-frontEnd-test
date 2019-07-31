const Student = require("./collections/students.json");
const School_Class = require("./collections/classes.json");
const Degree = require("./collections/degrees.json");
const Matter = require("./collections/matters.json");
const Realationship = require("./collections/relationships.json");
const Teacher = require("./collections/teachers.json");
const LastId = require("./collections/lastId.json");

module.exports.findAllStudents = function(req, res, next) {
    res.json(Student);
};

module.exports.findAllTeachers = function(req, res, next) {
    res.json(Teacher);
};

module.exports.findAllRelationships = function(req, res, next) {
    res.json(Realationship);
};
module.exports.findAllClasses = function(req, res, next) {
    res.json(School_Class);
};
module.exports.findAllDegrees = function(req, res, next) {
    res.json(Degree);
};
module.exports.findAllMatters = function(req, res, next) {
    res.json(Matter);
};
module.exports.getStudentsByDegreee = function(req, res, next) {
    let degree_id = req.params.id;
    console.log('degree_id:', degree_id)
    let students = []
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.degreeId == degree_id) students.push(student)
    }
    res.json(students);
};
module.exports.findStudent = function(req, res, next) {
    // console.log('req:', req.body)
    // console.log('req pa :', req.params)
    let id_to_find = req.params.id;
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.id == id_to_find) res.json(student);
    }
};
module.exports.updateStudent = function(req, res, next) {
    let id_to_find = req.params.id;
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.id == id_to_find) {
            console.log("student:", student);
            student.name = req.params.name;
            student.classId = parseInt(req.params.class);
            student.degreeId = parseInt(req.params.degree);
            console.log("student:", student);
            res.json(student);
        }
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

module.exports.createStudents = function(req, res) {
    let students = Student;
    let lastId = LastId.id;
    for (let i = 0; i < 300; i++) {
        students.push({
            id: lastId++,
            ra: Math.random()
                .toString()
                .substr(2, 9),
            name: `Nome do aluno ${lastId}`,
            degreeId: getRandomInt(13),
            classId: getRandomInt(6)
        });
    }
    LastId.id = lastId;
    res.json(Student);
};
