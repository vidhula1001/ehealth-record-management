
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      <div className="navbar-title">
        <h2>Electronic Health Record System</h2>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div>
            <h4>Administrator</h4>
            <p>System Admin</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;
