const Student = require("./collections/students.json");
const School_Class = require("./collections/classes.json");
const Degree = require("./collections/degrees.json");
const Matter = require("./collections/matters.json");
let Relationship = require("./collections/relationships.json");
const Teacher = require("./collections/teachers.json");
const LastId = require("./collections/lastId.json");
const querystring = require("querystring");

module.exports.findAllStudents = function (req, res, next) {
    res.json(Student);
};

module.exports.findAllTeachers = function (req, res, next) {
    res.json(Teacher);
};

module.exports.findAllRelationships = function (req, res, next) {
    res.json(Relationship);
};
module.exports.findAllClasses = function (req, res, next) {
    res.json(School_Class);
};
module.exports.findAllDegrees = function (req, res, next) {
    res.json(Degree);
};
module.exports.findAllMatters = function (req, res, next) {
    res.json(Matter);
};
module.exports.getStudentsByDegreee = function (req, res, next) {
    let degree_id = req.params.id;
    let students = [];
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.degreeId == degree_id) students.push(student);
    }
    res.json(students);
};
module.exports.findStudent = function (req, res, next) {
    let id_to_find = req.params.id;
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.id == id_to_find) res.json(student);
    }
};
module.exports.updateStudent = function (req, res, next) {
    let id_to_find = req.params.id;
    for (let i = 0; i < Student.length; i++) {
        const student = Student[i];
        if (student.id == id_to_find) {
            student.name = req.params.name;
            student.classId = parseInt(req.params.class);
            student.degreeId = parseInt(req.params.degree);
            res.json(student);
        }
    }
};
module.exports.updateRelationship = function (req, res, next) {
    // res.render()
    let body = "";
    let new_relationships = [];
    req.on("data", chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
        let relationships = JSON.parse(body);
        let new_relationships = []
        let relationships_keys = Object.keys(relationships);
        for (let i = 0; i < relationships_keys.length; i++) {
            const relation = relationships[relationships_keys[i]];
            new_relationship = {};
            new_relationship.id = relation.id;
            new_relationship.teacherId = relation.teacherId;
            new_relationship.matterId = relation.matter_selected.id;
            let has_data = false

            let degrees_keys = Object.keys(relation.degree_map);
            let degrees = [];

            for (let j = 0; j < degrees_keys.length; j++) {
                const school_degree = relation.degree_map[degrees_keys[j]];
                new_degree = {};
                new_degree.degreeId = school_degree.degreeId;

                let has_classes = false;
                let school_classes = []

                let classes_keys = Object.keys(school_degree.classes_map);
                for (let l = 0; l < classes_keys.length; l++) {
                    const school_class = school_degree.classes_map[classes_keys[l]];
                    if ( school_class.checked) {
                        has_classes = true;
                        school_classes.push({
                            "classId": classes_keys[l]
                        })
                    }
                }
                if (has_classes) {
                    has_data = true;
                    new_degree.classes = school_classes;
                    degrees.push(
                        new_degree
                    )
                }
            }
            new_relationship.degrees = degrees;
            if (has_data) {
                new_relationships.push(
                    new_relationship
                    )
                }
            }
            Relationship = new_relationships;
            res.json(new_relationships);
            res.end("ok");
        });
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

module.exports.createStudents = function (req, res) {
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
