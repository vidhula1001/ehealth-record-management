
import { NavLink } from "react-router-dom";
import "./Sidebar.css";


function Sidebar() {


  return (

    <div className="sidebar">


      <h2>
        🏥 EHR
      </h2>




      <ul>


        <li>

          <NavLink to="/dashboard">

            🏠 Dashboard

          </NavLink>

        </li>





        <li>

          <NavLink to="/patients">

            👥 Patients

          </NavLink>

        </li>





        <li>

          <NavLink to="/doctors">

            👨‍⚕️ Doctors

          </NavLink>

        </li>





        <li>

          <NavLink to="/appointments">

            📅 Appointments

          </NavLink>

        </li>





        <li>

          <NavLink to="/medical-records">

            📁 Medical Records

          </NavLink>

        </li>





        <li>

          <NavLink to="/reports">

            📊 Reports

          </NavLink>

        </li>





        <li>

          <NavLink to="/profile">

            👤 Profile

          </NavLink>

        </li>





        <li>

          <NavLink to="/">

            🚪 Logout

          </NavLink>

        </li>



      </ul>


    </div>

  );

}


export default Sidebar;
