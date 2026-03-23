import { useState, useRef, useEffect } from "react";
import "./AdminProfile.css";
import Swal from "sweetalert2";

export default function AdminProfile() {

const adminEmail = "admin@gmail.com";

const [activeTab,setActiveTab]=useState("overview");

const [showPasswordModal,setShowPasswordModal]=useState(false);
const [show2FAModal,setShow2FAModal]=useState(false);
const [showEditModal,setShowEditModal]=useState(false);

const [profile,setProfile]=useState({});
const [complaints,setComplaints]=useState([]);

const [editData,setEditData]=useState({});

const [otp,setOtp]=useState("");

const [passwordData,setPasswordData]=useState({
currentPassword:"",
newPassword:"",
confirmPassword:""
});

const fileInputRef=useRef(null);

const [profilePic,setProfilePic]=useState(
"https://cdn-icons-png.flaticon.com/512/616/616408.png"
);

/* ================= FETCH DATA ================= */

useEffect(()=>{

fetch(`http://localhost:8080/api/admin/profile/${adminEmail}`)
.then(res=>res.json())
.then(data=>{
setProfile(data);
setEditData(data);
});

fetch("http://localhost:8080/api/complaints")
.then(res=>res.json())
.then(data=>setComplaints(data));

},[]);


/* ================= PROFILE UPDATE ================= */

const handleProfileUpdate = async () => {

try{

const res = await fetch(`http://localhost:8080/api/admin/profile/update/${adminEmail}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(editData)
});

if(!res.ok){
throw new Error("Update failed");
}

const data = await res.json();

setProfile(data);
setShowEditModal(false);

Swal.fire({
icon:"success",
title:"Profile Updated",
text:"Your profile has been saved successfully"
});

}catch(err){

Swal.fire({
icon:"error",
title:"Update Failed",
text:"Unable to update profile"
});

}

};


/* ================= CHANGE PASSWORD ================= */

const handlePasswordUpdate = async () => {

if(!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword){
Swal.fire({
icon:"warning",
title:"Missing Fields",
text:"Please enter all password fields"
});
return;
}

if(passwordData.newPassword !== passwordData.confirmPassword){
Swal.fire({
icon:"error",
title:"Password mismatch",
text:"New password and confirm password must match"
});
return;
}

try{

const res = await fetch("http://localhost:8080/api/admin/change-password",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:adminEmail,
currentPassword:passwordData.currentPassword,
newPassword:passwordData.newPassword
})
});

const message = await res.text();

if(!res.ok){
Swal.fire({
icon:"error",
title:"Password Error",
text:message
});
return;
}

setShowPasswordModal(false);

Swal.fire({
icon:"success",
title:"Password Updated",
text:"Your password was changed successfully"
});

}catch(err){

Swal.fire({
icon:"error",
title:"Server Error",
text:"Password update failed"
});
}
};


/* ================= ENABLE 2FA ================= */

const handleEnable2FA = async () => {

try{

const res = await fetch("http://localhost:8080/api/admin/enable-2fa",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:adminEmail,
code:otp
})
});

const message = await res.text();

if(!res.ok){
Swal.fire({
icon:"error",
title:"Invalid OTP",
text:message
});
return;
}

setShow2FAModal(false);

Swal.fire({
icon:"success",
title:"2FA Enabled",
text:message
});

}catch(err){

Swal.fire({
icon:"error",
title:"Server Error",
text:"2FA request failed"
});

}

};


/* ================= IMAGE UPLOAD ================= */

const handleProfilePicUpload=(e)=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=(event)=>{
setProfilePic(event.target.result);
};

reader.readAsDataURL(file);

};


const recentActivity=complaints.slice(0,5);

return(

<div className="admin-profile-wrapper">

{/* HEADER */}

<div className="profile-top">

<div className="header-text">
<h1>Account Settings</h1>
<p>Manage profile, security and activity</p>
</div>

</div>


{/* HERO */}

<div className="profile-hero">

<div className="avatar-container">

<div
className="avatar-wrapper"
onClick={()=>fileInputRef.current.click()}
>

<img src={profilePic} alt="avatar"/>

<input
type="file"
ref={fileInputRef}
accept="image/*"
onChange={handleProfilePicUpload}
/>

<span className="online-dot"></span>

</div>

</div>


<div className="hero-info">

<h2>{profile.name || "Admin User"}</h2>

<p>{profile.email}</p>

<span className="role-badge">
{profile.role || "Super Administrator"}
</span>

<button
className="edit-profile-btn"
onClick={()=>setShowEditModal(true)}
>
Edit Profile
</button>

</div>

</div>


{/* TABS */}

<div className="profile-tabs">

{["overview","security","activity"].map(tab=>(
<button
key={tab}
className={`tab-btn ${activeTab===tab?"active":""}`}
onClick={()=>setActiveTab(tab)}
>
{tab}
</button>
))}

</div>


{/* CONTENT */}

<div className="panel">


{/* OVERVIEW */}

{activeTab==="overview" &&(

<>

<div className="panel-title">Profile Information</div>

<div className="info-row">
<label>Department</label>
<span>{profile.department}</span>
</div>

<div className="info-row">
<label>Phone</label>
<span>{profile.phone}</span>
</div>

<div className="info-row">
<label>Employee ID</label>
<span>{profile.employeeId}</span>
</div>

<div className="info-row">
<label>Location</label>
<span>{profile.location}</span>
</div>

<div className="info-row">
<label>Joined</label>
<span>{profile.joined}</span>
</div>

<div className="bio-section">
<h4>About</h4>
<p>{profile?.bio || "Managing system operations and complaint workflow monitoring."}</p>
</div>

</>

)}


{/* SECURITY */}

{activeTab==="security" &&(

<>

<div className="panel-title">Security Settings</div>

<div className="security-box">

<h4>Password</h4>

<button
className="outline-btn"
onClick={()=>setShowPasswordModal(true)}
>
Update Password
</button>

</div>


<div className="security-box">

<h4>Two Factor Authentication</h4>

<button
className="outline-btn"
onClick={()=>setShow2FAModal(true)}
>
Enable 2FA
</button>

</div>

</>

)}


{/* ACTIVITY */}

{activeTab==="activity" &&(

<>

<div className="panel-title">Recent Activity</div>

{recentActivity.map((c,i)=>(
<div key={i} className="activity-card">

<div>
<strong>{c.title}</strong>
<p>{c.status}</p>
</div>

<span>{c.date}</span>

</div>
))}

</>

)}

</div>


{/* EDIT PROFILE MODAL */}

{showEditModal &&(

<div className="modal-overlay">

<div className="modal-box">

<button
className="close-btn"
onClick={()=>setShowEditModal(false)}
>
✕
</button>

<h3>Edit Profile</h3>

<input
placeholder="Name"
value={editData.name || ""}
onChange={(e)=>setEditData({...editData,name:e.target.value})}
/>

<input
placeholder="Phone"
value={editData.phone || ""}
onChange={(e)=>setEditData({...editData,phone:e.target.value})}
/>

<input
placeholder="Department"
value={editData.department || ""}
onChange={(e)=>setEditData({...editData,department:e.target.value})}
/>

<input
placeholder="Location"
value={editData.location || ""}
onChange={(e)=>setEditData({...editData,location:e.target.value})}
/>

<textarea
placeholder="Bio"
value={editData.bio || ""}
onChange={(e)=>setEditData({...editData,bio:e.target.value})}
/>

<div className="modal-actions">

<button
className="cancel-btn"
onClick={()=>setShowEditModal(false)}
>
Cancel
</button>

<button
className="save-btn"
onClick={handleProfileUpdate}
>
Save
</button>

</div>

</div>

</div>

)}


{/* PASSWORD MODAL */}

{showPasswordModal &&(

<div className="modal-overlay">

<div className="modal-box">

<button
className="close-btn"
onClick={()=>setShowPasswordModal(false)}
>
✕
</button>

<h3>Update Password</h3>

<input
type="password"
placeholder="Current Password"
onChange={(e)=>setPasswordData({...passwordData,currentPassword:e.target.value})}
/>

<input
type="password"
placeholder="New Password"
onChange={(e)=>setPasswordData({...passwordData,newPassword:e.target.value})}
/>

<input
type="password"
placeholder="Confirm Password"
onChange={(e)=>setPasswordData({...passwordData,confirmPassword:e.target.value})}
/>

<div className="modal-actions">

<button
className="cancel-btn"
onClick={()=>setShowPasswordModal(false)}
>
Cancel
</button>

<button
className="save-btn"
onClick={handlePasswordUpdate}
>
Update
</button>

</div>

</div>

</div>

)}


{/* 2FA MODAL */}

{show2FAModal &&(

<div className="modal-overlay">

<div className="modal-box">

<button
className="close-btn"
onClick={()=>setShow2FAModal(false)}
>
✕
</button>

<h3>Enable 2FA</h3>

<input
placeholder="Enter OTP"
value={otp}
maxLength={6}
onChange={(e)=>setOtp(e.target.value)}
/>

<div className="modal-actions">

<button
className="cancel-btn"
onClick={()=>setShow2FAModal(false)}
>
Cancel
</button>

<button
className="save-btn"
onClick={handleEnable2FA}
>
Enable
</button>

</div>

</div>

</div>

)}

</div>

);

}