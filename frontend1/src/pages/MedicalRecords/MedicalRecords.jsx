
import { useState } from "react";
import "./MedicalRecords.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";


function MedicalRecords() {


  const [records, setRecords] = useState([

    {
      id:1,
      patient:"John Smith",
      doctor:"Dr. David",
      diagnosis:"Fever",
      prescription:"Paracetamol",
      date:"2026-07-10",
      notes:"Take medicine after food"
    },


    {
      id:2,
      patient:"Emma Watson",
      doctor:"Dr. Sarah",
      diagnosis:"Cold",
      prescription:"Cetirizine",
      date:"2026-07-11",
      notes:"Complete 5 days course"
    },


    {
      id:3,
      patient:"Sophia Brown",
      doctor:"Dr. James",
      diagnosis:"Headache",
      prescription:"Pain Relief Tablet",
      date:"2026-07-12",
      notes:"Regular checkup required"
    }

  ]);





  const [search,setSearch] = useState("");

  const [showModal,setShowModal] = useState(false);


  const [isEditing,setIsEditing] = useState(false);


  const [editingId,setEditingId] = useState(null);





  const [newRecord,setNewRecord] = useState({

    patient:"",
    doctor:"",
    diagnosis:"",
    prescription:"",
    date:"",
    notes:""

  });







  // Handle input changes

  const handleChange = (e)=>{


    setNewRecord({

      ...newRecord,

      [e.target.name]:e.target.value

    });


  };







  // Add / Update Record

  const handleSave = ()=>{


    if(

      newRecord.patient === "" ||

      newRecord.doctor === "" ||

      newRecord.diagnosis === "" ||

      newRecord.prescription === "" ||

      newRecord.date === ""

    ){

      alert("Please fill all required fields");

      return;

    }





    if(isEditing){



      const updatedRecords = records.map((record)=>


        record.id === editingId

        ?

        {

          ...newRecord,

          id:editingId

        }

        :

        record


      );



      setRecords(updatedRecords);


      setIsEditing(false);

      setEditingId(null);



    }

    else{



      const record = {


        id: records.length + 1,

        ...newRecord


      };



      setRecords([

        ...records,

        record

      ]);



    }







    setNewRecord({

      patient:"",
      doctor:"",
      diagnosis:"",
      prescription:"",
      date:"",
      notes:""

    });



    setShowModal(false);



  };









  // Delete Record

  const handleDelete=(id)=>{


    setRecords(

      records.filter(

        (record)=>record.id !== id

      )

    );


  };









  // Edit Record

  const handleEdit=(record)=>{


    setNewRecord({

      patient:record.patient,

      doctor:record.doctor,

      diagnosis:record.diagnosis,

      prescription:record.prescription,

      date:record.date,

      notes:record.notes


    });



    setEditingId(record.id);


    setIsEditing(true);


    setShowModal(true);


  };





  return (

    <div className="dashboard">


      <Sidebar />


      <div className="main-content">


        <Navbar />



        {/* Part 2 continues here */}
                 <div className="patients-header">


          <h2>
            Medical Records Management
          </h2>



          <button

            className="add-btn"

            onClick={()=>{


              setShowModal(true);

              setIsEditing(false);


              setNewRecord({

                patient:"",
                doctor:"",
                diagnosis:"",
                prescription:"",
                date:"",
                notes:""

              });


            }}

          >

            + Add Medical Record

          </button>


        </div>







        <div className="search-box">


          <input

            type="text"

            placeholder="Search Patient..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />


        </div>









        <table>


          <thead>


            <tr>

              <th>ID</th>

              <th>Patient</th>

              <th>Doctor</th>

              <th>Diagnosis</th>

              <th>Prescription</th>

              <th>Date</th>

              <th>Notes</th>

              <th>Actions</th>


            </tr>


          </thead>






          <tbody>


          {


          records

          .filter((record)=>

            record.patient
            .toLowerCase()
            .includes(search.toLowerCase())

          )


          .map((record)=>(



            <tr key={record.id}>


              <td>
                {record.id}
              </td>



              <td>
                {record.patient}
              </td>



              <td>
                {record.doctor}
              </td>



              <td>
                {record.diagnosis}
              </td>



              <td>
                {record.prescription}
              </td>



              <td>
                {record.date}
              </td>



              <td>
                {record.notes}
              </td>





              <td>


                <div className="action-buttons">


                  <button

                    className="edit-btn"

                    onClick={()=>handleEdit(record)}

                  >

                    Edit

                  </button>






                  <button

                    className="delete-btn"

                    onClick={()=>handleDelete(record.id)}

                  >

                    Delete

                  </button>



                </div>


              </td>



            </tr>



          ))



          }



          </tbody>



        </table>









        {
        showModal && (


        <div className="modal">


          <div className="modal-content">



            <h2>

              {

              isEditing

              ?

              "Edit Medical Record"

              :

              "Add Medical Record"

              }

            </h2>







            <input

              type="text"

              name="patient"

              placeholder="Patient Name"

              value={newRecord.patient}

              onChange={handleChange}

            />







            <input

              type="text"

              name="doctor"

              placeholder="Doctor Name"

              value={newRecord.doctor}

              onChange={handleChange}

            />







            <input

              type="text"

              name="diagnosis"

              placeholder="Diagnosis"

              value={newRecord.diagnosis}

              onChange={handleChange}

            />








            <input

              type="text"

              name="prescription"

              placeholder="Prescription"

              value={newRecord.prescription}

              onChange={handleChange}

            />








            <input

              type="date"

              name="date"

              value={newRecord.date}

              onChange={handleChange}

            />








            <input

              type="text"

              name="notes"

              placeholder="Doctor Notes"

              value={newRecord.notes}

              onChange={handleChange}

            />









            <div className="modal-buttons">



              <button

                className="save-btn"

                onClick={handleSave}

              >

                {

                isEditing

                ?

                "Update"

                :

                "Save"

                }


              </button>








              <button

                className="cancel-btn"

                onClick={()=>{


                  setShowModal(false);

                  setIsEditing(false);


                }}

              >

                Cancel

              </button>





            </div>





          </div>



        </div>


        )
        }
        
      </div>
     

    </div>


  );


}



export default MedicalRecords;
