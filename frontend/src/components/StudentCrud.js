import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'; 
import NavigationBar from "./Navbar"; 

function StudentCrud() {
  const [id, setId] = useState("");
  const [course, setCourse] = useState("");
  const [module, setModule] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
  });

  // Load token data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token); // Decode the token to get user info
      const { userId, firstName, lastName, email } = decoded;
      setUserData({
        userId,
        name: `${firstName} ${lastName}`, // Combine firstName and lastName
        email,
      });
    }
    loadStudents();
  }, []);

  async function loadStudents() {
    const token = localStorage.getItem("token"); // Retrieve the token
    try {
      const response = await axios.get("http://localhost:4000/api/Student/GetStudents", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    try {
      await axios.post(
        "http://localhost:4000/api/Student/AddStudent",
        {
          userId: userData.userId,
          course,
          module,
          contactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      alert("Student Registered Successfully");
      clearForm();
      loadStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to register student. Please try again.");
    }
  }

  async function editStudent(student) {
    setId(student.id); // Use the student schema id
    setCourse(student.course);
    setModule(student.module);
    setContactNumber(student.contactNumber);
  }

  async function update(event) {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the token
    try {
      await axios.put(
        `http://localhost:4000/api/Student/UpdateStudent/${id}`,
        {
          userId: userData.userId,
          course,
          module,
          contactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      alert("Student Updated Successfully");
      clearForm();
      loadStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student. Please try again.");
    }
  }

  async function deleteStudent(id) {
    const token = localStorage.getItem("token"); // Retrieve the token
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:4000/api/Student/DeleteStudent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        alert("Student Deleted Successfully");
        clearForm();
        loadStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  }

  function clearForm() {
    setId("");
    setCourse("");
    setModule("");
    setContactNumber("");
  }

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <div className="card">
          <h5 className="card-header bg-success text-white">Student Details</h5>
          <div className="card-body">
            <form onSubmit={save}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  hidden
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stname">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="stname"
                  value={userData.name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={userData.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(event) => setContactNumber(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="module">Module</label>
                <input
                  type="text"
                  className="form-control"
                  id="module"
                  value={module}
                  onChange={(event) => setModule(event.target.value)}
                  required
                />
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary m-3">
                  Register
                </button>
                <button type="button" className="btn btn-secondary" onClick={update}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">Registration Id</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Course</th>
                  <th scope="col">Module</th>
                  <th scope="col" style={{ width: "150px" }}>Options</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.userId}</td>
                    <td>{student.id}</td>
                    <td>{student.stname}</td>
                    <td>{student.email}</td>
                    <td>{student.contactNumber}</td>
                    <td>{student.course}</td>
                    <td>{student.module}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => editStudent(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCrud;
