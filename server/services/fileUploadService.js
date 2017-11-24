/**
 *@author mbharti@deloitte.com
 */
var User = require('../models/userSchema.js');

var csv = require('csv');
var obj = csv();
function Citizen(name, gender, age, dob, constituency, userName, password, verificationPaper) {
 
    this.name = name;
    this.gender = gender;
    this.age = age;
};

var Citizens = [];

obj.from.path('../datafile/dataInfo.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        User.push(new Employee(data[index][0], data[index][1], data[index][2]));
    }
    console.log(Employees);
});