import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import img1 from '../Images/img1.jpeg';
import Swal from 'sweetalert2'
import axios from "axios";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')

    const navigate = useNavigate();
    


    const handleLogin = async() => {
        await axios.post('http://localhost:8081/api/v1/auth/patient/authenticate', {
            email: email,
            password: password
        })
            .then(function (response) {
                //console.log(response.data);
            //     console.log(response.status);
                if(response.status===200)
                { 
                    // window.sessionStorage.setItem('isLogged_in','true');
                    // window.sessionStorage.setItem('id',response.data.id);
                   // window.location.reload(true);
                  // const  id=5;
                  console.log("heel");
                 console.log(response.data.role);
                   if(response.data.role==="PATIENT")
                {   
                     navigate('/patientDashboard', { state: {id:response.data} });  
                      
                    }
                    else if(response.data.role==="DOCTOR" ){
                    navigate('/doctorDashboard', { state: {id:response.data} });
                    }
                    else if(response.data.role==="ADMIN"){
                        navigate('/adminDashboard', { state: {id:response.data} });
                    }

              }
                else if(response.status === 403){
              
                    return Swal.fire(
                        'Incorrect Credentials',
                        'Please enter valid credentials',
                        'error'
                    );
                }
            })
            .catch(function (error) {
                return Swal.fire(
                    'Incorrect Credentials',
                    'Please enter valid credentials',
                    'error'
                );
                
            });
    }
  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center"> 
                     
                      <h4 className="mt-1 mb-5 pb-1">KHYBER HOSPITAL</h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example11" className="form-control" placeholder="Phone number or email address" onChange={(event)=>{setEmail(event.target.value)}}/>
                        <label className="form-label" htmlFor="form2Example11" >Username</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example22" className="form-control" onChange={(event)=>{setPwd(event.target.value)}} />
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"  onClick={handleLogin}>Log in</button>
                    
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link  className="btn btn-outline-danger" to="/patientRegistration" >Create new</Link>
                      </div>

                    </form>

                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                <img src={img1} alt="" style={{ width: "400px", height: "550px"  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
