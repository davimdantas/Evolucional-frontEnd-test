'use strict';

// Define the `frontEndTestApp` module
// let frontEndTestApp = angular.module('frontEndTestApp', [
angular.module('frontEndTestApp', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'core',
  'studentList',
  'teacherList',
  'editStudent',
  'editRelationship',
  'studentByDegree',
  'ui.bootstrap'
]);

// frontEndTestApp.controller('EditStudentCoddntroller',
// function (Student, School_class, Degree, record) {
// 	this.employee = {};
// 	function init() {
// 		this.employee.name = record.name;
// 		this.employee.classId = record.classId;
// 		this.employee.degreeId = record.degreeId;
// 		this.employee.id = record.id;
// 	}
// 	this.updateEmp = function() {
// 		this.cancelModal();
// 		if (
// 			!angular.isDefined(this.employee.name) ||
// 			this.employee.name === ""
// 		) {
// 			alert("employee name is empty");
// 			return;
// 		} else if (
// 			!angular.isDefined(this.employee.classId) ||
// 			this.employee.classId === ""
// 		) {
// 			alert("employee classId is empty");
// 			return;
// 		} else if (
// 			!angular.isDefined(this.employee.degreeId) ||
// 			this.employee.degreeId === ""
// 		) {
// 			alert("employee degreeId is empty");
// 			return;
// 		}
// 		// this.updateRecord(this.employee);
// 	};
// 	init();
// })