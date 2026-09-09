/*
Purpose: Review 35 concepts: 
Prototypes vs Classes 
Regular functions, anonymous functions, arrow functions
Callback functions 
MERN: It stands for Node.js 
*/

//Var is global vs let is local
var globalVariable = 100 
let localVariable = 200
function functionName() {
    let varInFunc = "local" 
}

//console.log(varInFunc) //WILL FAIL

//Prototype - one time use object from a prototype
const oneTimeUseObj = {
    prop1: "Dharwyn Ivor",
    prop2: "COMP2123", 
    method1: function(param1) {
        console.log(param1)
    }    
}

console.log(oneTimeUseObj.prop1) 
console.log(oneTimeUseObj.prop2)
oneTimeUseObj.method1("pizza")

//Prototype - using a constructor 
function Student(student_name_p, course_p, lunch_p) {
this.student_name = student_name_p
this.course = course_p
this.lunch = lunch_p
this.method1 = function (param1) {
return param1
}
}

const morning_student = new Student("Dharwyn Ivor", "COMP2123", "Noodles")
console.log(morning_student)
console.log(morning_student.student_name)
console.log(morning_student.course)
console.log(morning_student.method1(morning_student.lunch))

//Classes - always have constructors 
class Prof {
    constructor(prof_name_p) {
        this.prof_name = prof_name_p
    }
    method1(lunch) {
        console.log(lunch)
    }
}

const morning_prof = new Prof("Laily")
console.log(morning_prof.prof_name)
morning_prof.method1("Burger")

//Optional Homeworkk: Practice a callback 
//function using an array and the .map() 
//function