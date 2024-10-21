const express = require("express");
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../Controllers/studentController');
const auth = require('../middleware/auth'); 

router.get("/GetStudents", auth, getStudents);

router.post("/AddStudent", auth, addStudent);

router.put("/UpdateStudent/:id", auth, updateStudent);

router.delete("/DeleteStudent/:id", auth, deleteStudent);

module.exports = router;
