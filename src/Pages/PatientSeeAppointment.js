import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';
export default function PatientSeeAppointment() {
    const location = useLocation();
    const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
        console.log("hello");
       // console.log(location.state.id.id.id);
    try {
        const id=location.state.id.id.id;
        console.log(id);
        const url = `http://localhost:8081/api/patients/see/appointments/${id}`;
      const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} })
      console.log(result.data);
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
                        <></><th scope="col">Registration No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>(
                            
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{user.id}</td>
                                <td>{user.date}</td>
                                <td>{user.status}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>

  )
}
