
import { useState } from "react";
import "./Profile.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";


function Profile(){


const [profile,setProfile]=useState({

    name:"Admin User",
    email:"admin@ehr.com",
    phone:"9876543210",
    role:"Hospital Administrator"

});



const [edit,setEdit]=useState(false);





const handleChange=(e)=>{


setProfile({

    ...profile,

    [e.target.name]:e.target.value

});


};






return(


<div className="dashboard">


<Sidebar />



<div className="main-content">


<Navbar />




<div className="profile-container">



<h2>
My Profile
</h2>





<div className="profile-card">



<div className="profile-image">

👤

</div>






{
edit ?


<>



<input

name="name"

value={profile.name}

onChange={handleChange}

/>




<input

name="email"

value={profile.email}

onChange={handleChange}

/>





<input

name="phone"

value={profile.phone}

onChange={handleChange}

/>





<input

name="role"

value={profile.role}

onChange={handleChange}

/>



</>


:


<>


<h3>
{profile.name}
</h3>


<p>
📧 {profile.email}
</p>


<p>
📞 {profile.phone}
</p>


<p>
🏥 {profile.role}
</p>


</>


}





<button

className="edit-profile-btn"

onClick={()=>setEdit(!edit)}

>

{

edit
?
"Save Profile"
:
"Edit Profile"

}


</button>




</div>





<div className="password-card">


<h3>
Change Password
</h3>


<input

type="password"

placeholder="Current Password"

/>



<input

type="password"

placeholder="New Password"

/>




<button>

Update Password

</button>



</div>






</div>





</div>



</div>


);


}



export default Profile;
