
import { useState } from "react";
import "./Patients.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Patients() {
  const [patients, setPatients] = useState([
    {
      id: 101,
      name: "John Smith",
      age: 28,
      gender: "Male",
      phone: "9876543210",
    },
    {
      id: 102,
      name: "Emma Watson",
      age: 31,
      gender: "Female",
      phone: "9123456780",
    },
    {
      id: 103,
      name: "Sophia Brown",
      age: 24,
      gender: "Female",
      phone: "9988776655",
    },
    {
      id: 104,
      name: "David Wilson",
      age: 40,
      gender: "Male",
      phone: "9876123456",
    },
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPatient = () => {
    if (
      newPatient.id === "" ||
      newPatient.name === "" ||
      newPatient.age === "" ||
      newPatient.gender === "" ||
      newPatient.phone === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editingId ? newPatient : patient
      );

      setPatients(updatedPatients);

      setIsEditing(false);

      setEditingId(null);
    } else {
      setPatients([...patients, newPatient]);
    }

    setNewPatient({
      id: "",
      name: "",
      age: "",
      gender: "",
      phone: "",
    });

    setShowModal(false);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter(
      (patient) => patient.id !== id
    );

    setPatients(updatedPatients);
  };

  const handleEdit = (patient) => {
    setNewPatient(patient);
    setEditingId(patient.id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="patients-page">
      <Sidebar />

      <div className="patients-content">
        <Navbar />

        <div className="patients-header">
          <h2>Patient Management</h2>

          <button
            className="add-btn"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setNewPatient({
                id: "",
                name: "",
                age: "",
                gender: "",
                phone: "",
              });
            }}
          >
            + Add Patient
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
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients
              .filter((patient) =>
                patient.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(patient)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeletePatient(patient.id)
                      }
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
                {isEditing ? "Edit Patient" : "Add Patient"}
              </h2>

              <input
                type="text"
                name="id"
                placeholder="Patient ID"
                value={newPatient.id}
                onChange={handleChange}
                disabled={isEditing}
              />

              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={handleChange}
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPatient.age}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={newPatient.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newPatient.phone}
                onChange={handleChange}
              />

              <div className="modal-buttons">
                <button
                  className="save-btn"
                  onClick={handleAddPatient}
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

export default Patients;
