
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';
import { Form, Button, FormControl } from "react-bootstrap";

export default function PatientQuiries() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const id = location.state.id.id.id;
      const url = `http://localhost:8081/api/patients/get/quiries/$ {id}`;
      const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} })
      setUsers(result.data);
     
    } catch (error) {
      console.error(error);
    }
  }





  return (
    <div className='container'>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject</th>
              <th scope="col">Query</th>
              <th scope="col">Reply</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user,index)=>(
              <tr key={user.id}>
                <th scope="row">{index+1}</th>
                <td>{user.subject}</td>
                <td>{user.queryText}</td>
                <td>{user.replyText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
