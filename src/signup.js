import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react'
import auth from './firebase'
import { doc, setDoc} from "firebase/firestore"
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'

import {Link} from 'react-router-dom'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {storage} from './firebase'
function Signup(){
    let navigate=useNavigate()
  let [email,setemail]=useState('');
  let[password,setpassword]=useState('');
  let[name,setname]=useState('')
  let[username,setusername]=useState('')
  let [load,setload]=useState(false)
    let[error,seterror]=useState('');
    let [user,setuser]=useState(0)
    let [profileimage,updateimage]=useState("")
   function togglepassword(){
    const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#inputPassword4');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    togglePassword.classList.toggle('fa-eye-slash');

   }
 function signedup(e){
  e.preventDefault()
  setload(true)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate('/')
    
   setload(false);
  
   
    setuser(user.uid)
    console.log(user);
    // ...
  })
  .catch((error) => {
    setload(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    seterror(errorMessage);
     setTimeout(() => {
      seterror('');
     },1000);

    console.log(error);
    // ..
  });
 }


    return(
      <>
      {
       
        error!=''?<div class="alert alert-danger d-flex align-items-center" role="alert">
                
                <div>
                  {error}
                </div>
                </div>:load==true? <div class="d-flex align-items-center">
  <strong>Loading...</strong>
  <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
</div>:user!=''? <div class="alert alert-primary" role="alert">
                your email verification id is {user}
               </div>:
      
       <div style={{ display:'flex',alignItems:'center',marginTop:40,flexDirection:'column'}}>
        <form class="row g-3" style={{display:'flex',flexDirection:'column',border:'1px solid rgba(var(--b6a,219,219,219),1)',width:400,justifyContent:'center',paddingLeft:40}}>
        
          <h2 style={{color:`rgba(var(--f52,142,142,142),1)`,fontSize:'20px',fontWeight:600,margin:10}}>Sign up to Draw your imagination</h2>
        <div class="col-10">
   
    <input type="text" class="form-control" placeholder=" Full Name" id="inputAddress" value={name} onChange={(e)=>{
         setname(e.target.value);
    }}/>
  </div>
  <div class="col-10">
   
    <input type="text" class="form-control" placeholder="Username" id="inputAddress2" value={username} onChange={(e)=>{
         setusername(e.target.value);
    }}/>
  </div>
  <div class="col-md-10">
    
    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" value={email} onChange={(e)=>{
       setemail(e.target.value);
    }}/>
  </div>
  <div class="col-md-10">
    
    <input type="password" class="form-control" placeholder="Password" id="inputPassword4" value={password} onChange={(e)=>{
        setpassword(e.target.value)  
    }}/>
    <i class="far fa-eye" id="togglePassword" onClick={togglepassword} style={{position:'absolute',right:600,top:385}}></i>
  </div>
  
  <div class="col-10">
   
    <input type="text" class="form-control" id="inputPassword" placeholder="Confirm Password" value={password}/> </div>
  
  
  
 
  <div class="col-10">
    <button  class="btn btn-primary" onClick={signedup} style={{width:280}}>Sign Up</button>
  </div>
</form>
<div>
  <p>Have an account? <Link to="/" style={{textDecoration:'none'}}>Log in</Link></p>
</div>
       </div>
  }
  </>
    )
}
export default Signup