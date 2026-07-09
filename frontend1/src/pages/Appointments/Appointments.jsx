
import { useState } from "react";
import "./Appointments.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. David",
      date: "2026-07-10",
      time: "10:30",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Emma Watson",
      doctor: "Dr. Sarah",
      date: "2026-07-11",
      time: "11:00",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Sophia Brown",
      doctor: "Dr. James",
      date: "2026-07-12",
      time: "09:00",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  const handleChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !newAppointment.patient ||
      !newAppointment.doctor ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      const updated = appointments.map((appointment) =>
        appointment.id === editingId
          ? { ...newAppointment, id: editingId }
          : appointment
      );

      setAppointments(updated);
      setIsEditing(false);
      setEditingId(null);
    } else {
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
      };

      setAppointments([...appointments, appointment]);
    }

    setNewAppointment({
      patient: "",
      doctor: "",
      date: "",
      time: "",
      status: "Scheduled",
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  const handleEdit = (appointment) => {
    setNewAppointment({
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
    });

    setEditingId(appointment.id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="patients-header">
          <h2>Appointment Management</h2>

          <button
            className="add-btn"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);

              setNewAppointment({
                patient: "",
                doctor: "",
                date: "",
                time: "",
                status: "Scheduled",
              });
            }}
          >
            + Add Appointment
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments
              .filter((appointment) =>
                appointment.patient
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patient}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(appointment)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>
                {isEditing ? "Edit Appointment" : "Add Appointment"}
              </h2>

              <input
                type="text"
                name="patient"
                placeholder="Patient Name"
                value={newAppointment.patient}
                onChange={handleChange}
              />

              <input
                type="text"
                name="doctor"
                placeholder="Doctor Name"
                value={newAppointment.doctor}
                onChange={handleChange}
              />

              <input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleChange}
              />

              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleChange}
              />

              <select
                name="status"
                value={newAppointment.status}
                onChange={handleChange}
              >
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>

              <div className="modal-buttons">
                <button className="save-btn" onClick={handleSave}>
                  {isEditing ? "Update" : "Save"}
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointments;
