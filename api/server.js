const port = 3005;

// const bodyParser = require('body-parser');
var express = require('express')
, cors = require('cors')
, server = express();

server.use(cors());

// const server = express();
const schoolService = require('./school_service');
server.get('/get_all_students', schoolService.findAllStudents);
server.get('/get_all_teachers', schoolService.findAllTeachers);
server.get('/get_student/:id', schoolService.findStudent);
server.get('/get_all_relationships', schoolService.findAllRelationships);
server.get('/get_all_matters', schoolService.findAllMatters);
server.get('/get_all_classes', schoolService.findAllClasses);
server.get('/get_all_degrees', schoolService.findAllDegrees);
server.get('/get_students_by_degree/:id', schoolService.getStudentsByDegreee);
server.post('/update_student/:id/:name/:class/:degree', schoolService.updateStudent);
server.post('/update_relationship', schoolService.updateRelationship);
server.get('/createStudents', schoolService.createStudents);
server.listen(port, function () {
    console.log(`Backend is running on port ${port}.`);
});
