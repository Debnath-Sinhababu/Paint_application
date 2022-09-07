import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth"
import { signOut } from "firebase/auth";
import auth from './firebase'
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
 function Login(){
    let [email,setemail]=useState('');
    let[password,setpassword]=useState('');
    let [load,setload]=useState(false);
    let[error,seterror]=useState(false);
    let [user,setuser]=useState(0);
    function getsigned(){
        setload(true);
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
             setload(false);
            setuser(user.uid);
              // console.log(user);
              // ...
            })
            .catch((error) => {
           
             setload(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              seterror(true);
              setTimeout(() => {
                 seterror(false); 
              },1000);
            });
      }
    return(
        <div style={{width:'100vw',height:'60vh', margin:'auto',marginTop:20,paddingTop:30}} className="login-details">
            {
                error==true?<div class="alert alert-danger d-flex align-items-center" role="alert">
                
                <div>
                  Enter correct emailid and password
                </div>
              </div>:
              load==true? <div class="d-flex align-items-center">
              <strong>Loading...</strong>
              <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>:user!=0 ? <Navigate to="/board"/>
            //   <div class="alert alert-primary" role="alert">
            //  your email verification id is {user} <button onClick={getloggedout}>Logout</button>
            // </div> 
            :
            
            <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',width:'100%',justifyContent:'center'}}>
          
              

              
              
           <div style={{width:350,height:300,border:"1px solid rgba(var(--b6a,219,219,219),1)", display:'flex',alignItems:'center' , flexDirection:'column',marginTop:20,position:'relative',paddingTop:30}} > 
          <h5 style={{marginDown:20}}>Log in to draw your creativity</h5>
        <div class="form-floating mb-2">
        <input type="email" class="form-control" id="floatingInput" value={email} placeholder="@example.com" style={{height:30,width:300,backgroundColor:'#FAFAFA'}} onChange={(e)=>{
           setemail(e.target.value);
        }}/>
        <label htmlFor="floatingInput" style={{lineHeight:0}}>Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" value={password} placeholder="Password" style={{height:30,width:300,backgroundColor:'#FAFAFA'}} onChange={(e)=>{
          setpassword(e.target.value);
        }}/>
        <label htmlFor="floatingPassword" style={{lineHeight:0}}>Password</label>
      </div>
      <input class="btn btn-primary" style={{marginTop:20,width:300,backgroundColor:'rgba(var(--d69,0,149,246),1)',color:'rgba(var(--eca,255,255,255),1)'}} type="button" value="Login" onClick={getsigned}></input>
      <div style={{marginTop:20}}>
        <span> Dont have an account?</span> <Link to='/signup' style={{textDecoration:'none'}}>Signup</Link>
      </div>
     
      </div>
      </div>
}
      </div>
    )
 }
 export default Login