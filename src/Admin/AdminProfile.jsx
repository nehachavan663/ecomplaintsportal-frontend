import { useState, useRef, useEffect } from "react";
import "./AdminProfile.css";
import Swal from "sweetalert2";

export default function AdminProfile() {

const adminEmail = "admin@gmail.com";

const [activeTab,setActiveTab]=useState("overview");
const [showPasswordModal,setShowPasswordModal]=useState(false);
const [showEditModal,setShowEditModal]=useState(false);

const [profile,setProfile]=useState({});
const [complaints,setComplaints]=useState([]);
const [editData,setEditData]=useState({});

const [passwordData,setPasswordData]=useState({
currentPassword:"",
newPassword:"",
confirmPassword:""
});

const fileInputRef=useRef(null);

const [profilePic,setProfilePic]=useState(
"https://cdn-icons-png.flaticon.com/512/616/616408.png"
);

/* ================= FETCH ================= */
useEffect(()=>{
fetch(`https://ecomplaintsportal-backend.onrender.com/api/admin/profile/${adminEmail}`)
.then(res=>res.json())
.then(data=>{
setProfile(data);
setEditData(data);
});

fetch("https://ecomplaintsportal-backend.onrender.com/api/complaints")
.then(res=>res.json())
.then(data=>setComplaints(data));
},[]);

/* ================= IMAGE ================= */
const handleProfilePicUpload=(e)=>{
const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();
reader.onload=(ev)=>setProfilePic(ev.target.result);
reader.readAsDataURL(file);
};

/* ================= PROFILE UPDATE ================= */
const handleProfileUpdate = async () => {
try{
const res = await fetch(`https://ecomplaintsportal-backend.onrender.com/api/admin/profile/update/${adminEmail}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(editData)
});

if(!res.ok) throw new Error();

const data = await res.json();
setProfile(data);
setShowEditModal(false);

Swal.fire("Success","Profile Updated","success");

}catch{
Swal.fire("Error","Update failed","error");
}
};

/* ================= PASSWORD ================= */
const handlePasswordUpdate = async () => {

if(!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword){
return Swal.fire("Warning","Fill all fields","warning");
}

if(passwordData.newPassword !== passwordData.confirmPassword){
return Swal.fire("Error","Passwords do not match","error");
}

try{
const res = await fetch("https://ecomplaintsportal-backend.onrender.com/api/admin/change-password",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:adminEmail,
currentPassword:passwordData.currentPassword,
newPassword:passwordData.newPassword
})
});

const msg = await res.text();

if(!res.ok){
return Swal.fire("Error",msg,"error");
}

setShowPasswordModal(false);
Swal.fire("Success","Password Updated","success");

}catch{
Swal.fire("Error","Server error","error");
}
};

const recentActivity=complaints.slice(0,5);

return (

<div className="admin-profile-wrapper">

{/* HEADER */}
<div className="profile-top">
<div>
<h1>Account Settings</h1>
<p>Manage profile, security and activity</p>
</div>
</div>

{/* HERO */}
<div className="profile-hero">

<div className="avatar-wrapper" onClick={()=>fileInputRef.current.click()}>
<img src={profilePic} alt="avatar"/>
<input type="file" ref={fileInputRef} onChange={handleProfilePicUpload}/>
<span className="online-dot"></span>
</div>

<div className="hero-info">
<h2>{profile.name || "Admin User"}</h2>
<p>{profile.email}</p>

<button className="edit-profile-btn" onClick={()=>setShowEditModal(true)}>
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
onClick={()=>setActiveTab(tab)}>
{tab}
</button>
))}
</div>

{/* PANEL */}
<div className="panel">

{/* OVERVIEW */}
{activeTab==="overview" && (
<>
<div className="panel-title">Profile Information</div>

<div className="info-row"><label>Department</label><span>{profile.department}</span></div>
<div className="info-row"><label>Phone</label><span>{profile.phone}</span></div>
<div className="info-row"><label>Employee ID</label><span>{profile.employeeId}</span></div>
<div className="info-row"><label>Location</label><span>{profile.location}</span></div>
<div className="info-row"><label>Joined</label><span>{profile.joined}</span></div>

<div className="bio-section">
<h4>About</h4>
<p>{profile?.bio || "Managing system operations."}</p>
</div>
</>
)}

{/* SECURITY */}
{activeTab==="security" && (
<>
<div className="panel-title">Security</div>

<div className="security-box">
<h4>Password</h4>
<button className="outline-btn" onClick={()=>setShowPasswordModal(true)}>
Update Password
</button>
</div>

</>
)}

{/* ACTIVITY */}
{activeTab==="activity" && (
<>
<div className="panel-title">Activity</div>

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

{/* EDIT MODAL */}
{showEditModal && (
<div className="modal-overlay">
<div className="modal-box">

<button className="close-btn" onClick={()=>setShowEditModal(false)}>✕</button>

<h3>Edit Profile</h3>

<input placeholder="Name" value={editData.name || ""}
onChange={(e)=>setEditData({...editData,name:e.target.value})}/>

<input placeholder="Phone" value={editData.phone || ""}
onChange={(e)=>setEditData({...editData,phone:e.target.value})}/>

<input placeholder="Department" value={editData.department || ""}
onChange={(e)=>setEditData({...editData,department:e.target.value})}/>

<textarea placeholder="Bio" value={editData.bio || ""}
onChange={(e)=>setEditData({...editData,bio:e.target.value})}/>

<div className="modal-actions">
<button className="cancel-btn" onClick={()=>setShowEditModal(false)}>Cancel</button>
<button className="save-btn" onClick={handleProfileUpdate}>Save</button>
</div>

</div>
</div>
)}

{/* PASSWORD MODAL */}
{showPasswordModal && (
<div className="modal-overlay">
<div className="modal-box">

<button className="close-btn" onClick={()=>setShowPasswordModal(false)}>✕</button>

<h3>Update Password</h3>

<input type="password" placeholder="Current Password"
onChange={(e)=>setPasswordData({...passwordData,currentPassword:e.target.value})}/>

<input type="password" placeholder="New Password"
onChange={(e)=>setPasswordData({...passwordData,newPassword:e.target.value})}/>

<input type="password" placeholder="Confirm Password"
onChange={(e)=>setPasswordData({...passwordData,confirmPassword:e.target.value})}/>

<div className="modal-actions">
<button className="cancel-btn" onClick={()=>setShowPasswordModal(false)}>Cancel</button>
<button className="save-btn" onClick={handlePasswordUpdate}>Update</button>
</div>

</div>
</div>
)}

</div>
);
}