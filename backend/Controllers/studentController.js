const Student = require('../Model/studentModel');
const User = require('../Model/userModel');

// Get all students with user details
exports.getStudents = async (req, res) => {
  try {
    // Fetch students with associated user details (JOIN equivalent)
    const students = await Student.findAll({
      include: {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ msg: "No students found" });
    }

    const studentData = students.map(student => {
      const stname = `${student.User.firstName} ${student.User.lastName}`;
      return {
        id: student.id,
        userId: student.userId,
        stname,
        email: student.User.email,
        contactNumber: student.contactNumber,
        course: student.course,
        module: student.module,
      };
    });

    res.json(studentData);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send("Server error");
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { userId, course, module, contactNumber } = req.body;
  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new student entry
    const newStudent = await Student.create({
      userId,
      course,
      module,
      contactNumber
    });

    const stname = `${user.firstName} ${user.lastName}`;
    res.json({
      id: newStudent.id,
      userId: user.id,
      stname,
      email: user.email,
      contactNumber: newStudent.contactNumber,
      course: newStudent.course,
      module: newStudent.module,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { userId, course, module, contactNumber } = req.body;
  const { id } = req.params;

  try {
    // Find the student by ID
    let student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update student data
    student.course = course;
    student.module = module;
    student.contactNumber = contactNumber;

    await student.save();

    const stname = `${user.firstName} ${user.lastName}`;
    res.json({
      id: student.id,
      userId: user.id,
      stname,
      email: user.email,
      contactNumber: student.contactNumber,
      course: student.course,
      module: student.module,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    await student.destroy();
    res.json({ msg: "Student removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
