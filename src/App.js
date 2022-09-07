import logo from './logo.svg';
import './App.css';
import { createElement, useEffect } from 'react';
import { useLayoutEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import { useState } from 'react';
import {useContext} from 'react';
import {Storestack} from './index'
import {useRef} from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './signup';
import Cartboard from './cartboard';
import Login from './login';
function App() {


  return(
  <Routes>
    <Route
      path='/'
      element={<Login/>}
    />
    <Route path='/board'
    element={<Cartboard/>}/>
    <Route path='/signup'
    element={<Signup/>}/>
    
  </Routes>
  )


}
export default App;
