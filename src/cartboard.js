import './App.css';
import { createElement, useEffect } from 'react';

import rough from 'roughjs/bundled/rough.esm';
import { useState } from 'react';
import {useContext} from 'react';
import {Storestack} from './index'
import auth from './firebase';
import {useRef} from 'react'
import { signOut } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
 function Cartboard(){
let stackval=useContext(Storestack)
const contextref=useRef(null)
const canvasref=useRef(null)
const [drawing,setdrawing]=useState(false)
const [elements,setelements]=useState([])
const[tool,setTool]=useState()
const generator=rough.generator()
let [color,setcolor]=useState("black")
let [draw_width,setdrawwidth]=useState(2)
let [undoarr,setundoarr]=useState([])
let [stack,updatestack]=useState()

let nav=useNavigate()






function mousedown(e){
  const canvas=canvasref.current
 
  
  contextref.current.beginPath();

  const {clientX,clientY}=e;
  contextref.current.moveTo(clientX-canvas.offsetLeft,clientY-canvas.offsetTop);


  setdrawing(true)
}
function mousemove(e){
  if(!drawing)
  return
  const canvas=document.querySelector('#canvas')
  let context=canvas.getContext('2d')
  
  const {clientX,clientY}=e;
  context.lineTo(clientX-canvas.offsetLeft,clientY-canvas.offsetTop)
  context.strokeStyle=color;
  context.lineWidth=draw_width;
  context.lineCap='round';
  context.lineJoin='round'
  context.stroke()
// const{x1,y1}=elements[elements.length-1]
//    const element=createelement(x1,y1,clientX,clientY,tool);
//    let elementcopy=[...elements]
//    elementcopy[elementcopy.length-1]=element
//    setelements(elementcopy)

}
function mouseup(){
  const canvas=document.querySelector('#canvas')
  let context=canvas.getContext('2d')
  
  if(drawing){
    context.stroke();
    context.closePath()
    let clonearr=[...undoarr]
    clonearr.push(context.getImageData(0,0,canvas.width,canvas.height))
    setundoarr(clonearr)
    
  }

  setdrawing(false)
}
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          const canvas=canvasref.current
          canvas.width=window.innerWidth-60;
          canvas.height=400;
          let context=canvas.getContext('2d')
          context.clearRect(0,0,canvas.width,canvas.height)
       
        
         
         context.fillStyle='wheat'
          context.fillRect(0,0,canvas.width,canvas.height)
          contextref.current=context
          updatestack(stackval)
          // ...
        } else {
          // User is signed out
          // ...
          nav('/')
        }
    })
  
},[])

function undo_ele(){
 
  let context=contextref.current
 
  if(undoarr.length==0)
  clear_canvas()
  else if(undoarr.length==1){
    let copystack=stack;
    copystack.add(undoarr[0])
    updatestack(copystack)
    
    
   //  context.fillStyle='wheat';
    context.clearRect(0,0,canvasref.current.width,canvasref.current.height)  
    context.fillRect(0,0,canvasref.current.width,canvasref.current.height)
   setundoarr([])
    
  }
  else{
    let arr=[...undoarr]
    let copystack=stack
    copystack.add(undoarr[undoarr.length-1])
    updatestack(copystack)
    arr.pop()
    setundoarr(arr)
    context.putImageData(arr[arr.length-1],0,0)
  }
  console.log(stack)
  console.log(undoarr)
}
function clear_canvas(){
 
 //  context.fillStyle='wheat';
 contextref.current.clearRect(0,0,canvasref.current.width,canvasref.current.height)  
 contextref.current.fillRect(0,0,canvasref.current.width,canvasref.current.height)
 setundoarr([])
 console.log(stack)
 console.log(undoarr)
 let copystack=stack
 copystack.items=[]
 updatestack(copystack)
}
function redo_ele(){
 
 
  let copystack=stack;
   console.log(copystack.items)
   if(copystack.items.length==0)
   return
   let ele=copystack.peek()
   contextref.current.putImageData(ele,0,0)
   copystack.remove()
   updatestack(copystack)
   console.log(stack)
   let arr=[...undoarr]
   arr.push(ele)
   setundoarr(arr)
}
function log_out(){
    signOut(auth).then(() => {
      // Sign-out successful.
     
     
      let page='/'
      nav(page,{replace:true})
    
     
     
   
     
  
   
      // findlogout(false)
    }).catch((error) => {
      // An error happened.
      console.log(error);
    })
   }

return (
  <div className='field'>
   
  <canvas id='canvas'
   onMouseDown={mousedown}
   onMouseMove={mousemove}
   onMouseUp={mouseup}
   ref={canvasref}
  ></canvas>
  <div className='tool'>
   <button type='button' className='button' onClick={undo_ele}>undo</button>
   <button type='button' className='button' onClick={clear_canvas}>clear</button>
   <button type='button' className='button'onClick={redo_ele} >Redo</button>
    

   <div className='color-field' style={{backgroundColor:'red'}} onClick={(e)=>{
     let color=e.target.style.backgroundColor
   setcolor(color)

   }}></div>
   <div className='color-field' style={{backgroundColor:'blue'}}onClick={(e)=>{
     let color=e.target.style.backgroundColor
   setcolor(color)

   }}></div>
   <div className='color-field' style={{backgroundColor:'green'}}onClick={(e)=>{
     let color=e.target.style.backgroundColor
   setcolor(color)

   }}></div>
   <div className='color-field' style={{backgroundColor:'yellow'}}onClick={(e)=>{
     let color=e.target.style.backgroundColor
   setcolor(color)

   }}></div>
   <input type="color" name="" id="" onChange={(e)=>{
        setcolor(e.target.value)
   }} />
   <input type="range" name="" min={1} max={100} id="" onChange={(e)=>{
          setdrawwidth(e.target.value)
   }} />
    <button className='button' onClick={log_out} style={{marginLeft:20}}>Logout</button>
  </div>
   </div>
);
}

export default Cartboard
