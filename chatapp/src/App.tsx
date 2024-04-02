import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './Main/Main'
import Signup from './Main/Signup'
import Login from './Main/Login'

function App() {
  // const [count, setCount] = useState(0)

  const IsLogin = localStorage.getItem('IsLogin')
  const IsSignup = localStorage.getItem('IsSignup')
  return (
    <>

    <div>
    {IsLogin ? (
      <Main/>
    ):(

      (IsSignup ? (
        <Signup/>
      ):(
        <Login/>
      ))

     
    )}


    </div>
 

  
    </>

  )
}

export default App
