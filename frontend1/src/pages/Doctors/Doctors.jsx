
import { useState } from "react";
import "./Doctors.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Doctors() {

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. David",
      specialization: "Cardiology",
      experience: 12,
      phone: "9876543210"
    },
    {
      id: 2,
      name: "Dr. Sarah",
      specialization: "Neurology",
      experience: 8,
      phone: "9876501234"
    },
    {
      id: 3,
      name: "Dr. James",
      specialization: "Orthopedics",
      experience: 15,
      phone: "9123456789"
    }
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    id: "",
    name: "",
    specialization: "",
    experience: "",
    phone: ""
  });

  const handleChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveDoctor = () => {

    if (
      newDoctor.id === "" ||
      newDoctor.name === "" ||
      newDoctor.specialization === "" ||
      newDoctor.experience === "" ||
      newDoctor.phone === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {

      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === editingId ? newDoctor : doctor
      );

      setDoctors(updatedDoctors);

      setIsEditing(false);
      setEditingId(null);

    } else {

      setDoctors([...doctors, newDoctor]);

    }

    setNewDoctor({
      id: "",
      name: "",
      specialization: "",
      experience: "",
      phone: ""
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedDoctors = doctors.filter(
      (doctor) => doctor.id !== id
    );

    setDoctors(updatedDoctors);
  };

  const handleEdit = (doctor) => {
    setNewDoctor(doctor);
    setEditingId(doctor.id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="patients-header">

          <h2>Doctor Management</h2>

          <button
            className="add-btn"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setNewDoctor({
                id: "",
                name: "",
                specialization: "",
                experience: "",
                phone: ""
              });
            }}
          >
            + Add Doctor
          </button>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {doctors
              .filter((doctor) =>
                doctor.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((doctor) => (

                <tr key={doctor.id}>

                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience} Years</td>
                  <td>{doctor.phone}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(doctor)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

        {showModal && (

          <div className="modal">

            <div className="modal-content">

              <h2>
                {isEditing ? "Edit Doctor" : "Add Doctor"}
              </h2>

              <input
                type="text"
                name="id"
                placeholder="Doctor ID"
                value={newDoctor.id}
                onChange={handleChange}
                disabled={isEditing}
              />

              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={newDoctor.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={handleChange}
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={newDoctor.experience}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newDoctor.phone}
                onChange={handleChange}
              />

              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={handleSaveDoctor}
                >
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

export default Doctors;
