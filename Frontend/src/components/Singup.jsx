import React from 'react'
import "./Singup.css";

export default function Singup() {
  return (
   <div className='box'>
   <div class="cowimg">
  <img class="main-img" src="Singup.jpg" alt="" />
  <img class="logo-img" src="whatsapp.jpg" alt="Company Logo" /> 
  {/* <h4 className='h4'>StraySafe</h4> */}
</div>

<h4 className='h4'>StraySafe</h4>

   <div className='content'>
<h2>Create a new account</h2>
<p>Create your StraySafe account to join a community<br></br>
 working for animal safety. Start reporting, <br></br>
tracking, and making a positive impact today.<br></br>
Share Export Rewrite
</p>
   </div>

<button className='volentier'>
    <img  className='img1'  src="volenteer-removebg-preview.png" alt="volenteer" />
    <h2>Sign up as a  Volunteer</h2>
    <img    className='img2'  src="yes-removebg-preview.png" alt="" />

    </button>

<button className='volentier2'>
     <img  className='img1'  src="ngo-removebg-preview.png" alt="volenteer" />
    <h2>Sign up as a  NGO</h2>
      <img    className='img2'  src="yes-removebg-preview.png" alt="" />

    </button>

<div className='alredy'>
<p>Already have an account?</p>
<button  className='h5'>Login</button>

<button className='button1'>Next</button>
</div>


   </div>
  )
}
