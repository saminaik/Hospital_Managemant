import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  function approve() {
    navigate("/approveAppoinments", { state: { id: location.state } });
  }
  function priscription(){
    navigate("/precription", { state: { id: location.state } });
  }
  function logout() {
    navigate("/"); // Replace "/login" with the actual path to your login page.
  }
  return (
    <React.Fragment>
      <div>
        <h1>Doctor Dashboard</h1>
      </div>
      <button
        type="button"
        className="btn btn-success btn-lg btn-block"
        onClick={() => approve()}
      >
        Approve appoinments{" "}
      </button>
      <button
        type="button"
        className="btn btn-dark btn-lg btn-block"
        onClick={() => priscription()}
      >
       Give prescription{" "}
      </button>
      <button
        type="button"
        className="btn btn-danger btn-lg btn-block"
        onClick={() => logout()}
      >
        Logout
      </button>
    </React.Fragment>
  );
}
