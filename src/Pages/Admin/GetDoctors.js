import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
export default function GetDoctors() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // console.log(location.state.id.id.id);
    try {
      const token = location.state.id.id.token;
      console.log(token);
      const url = `http://localhost:8081/api/admin/doctors`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("result");
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  function handleDoctorDelete(id) {
    const token = location.state.id.id.token;

    axios
      .delete(`http://localhost:8081/api/admin/doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);

        loadUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1>List of Doctors</h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <></>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Specialization</th>
              <th scope="col">Email</th>
              <th scope="col">Timing</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.specialization}</td>
                <td>{user.email}</td>
                <td>{user.timing}</td>

              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
