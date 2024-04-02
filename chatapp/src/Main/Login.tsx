import React, { useEffect, useState } from "react";
import './css/Login.css'
import axios from "axios";
import { Url } from "../config";
import { AlertModal } from "../Alert";


const BASE_URL = Url();
interface UserData{
    username:string,
    password:string,

}
const Login: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData>({ 
 
        username: '',  // This property seems to be incorrect, consider removing it
        password: ''
    });

    const [show,setshow] = useState<boolean>(false)

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const SaveUser = async() => {

        if (!userProfile.username || !userProfile.password) {
            const modal = AlertModal('Required fields are missing')
            document.body.appendChild(modal);

            setTimeout(() => {
                document.body.removeChild(modal);
            }, 2000); // 5000 milliseconds = 5 seconds
            // Display error message or handle the error as needed
            // console.error('Required fields are missing');
            return;
        }
    
        // Check if the email format is incorrect

        try{

            

            const response = await axios.post(`${BASE_URL}/api/login/`,{data:userProfile})
             console.log(response.data)
             setUserProfile({ 
                username: '',  // This property seems to be incorrect, consider removing it
                password: ''
            })

            const data = response.data.data

            localStorage.setItem('IsLogin','true')
            localStorage.setItem('UserFullname',data.UserFullname)
            localStorage.setItem('UserID',data.UserID)
            window.location.reload()
        }
        catch(error:any){
            const modal = AlertModal(error.response.data.message)
            document.body.appendChild(modal);

            setTimeout(() => {
                document.body.removeChild(modal);
            }, 2000); // 5000 milliseconds = 5 seconds
        }
    }
    const SignupUser = async() => {
        localStorage.setItem('IsSignup','true')
        window.location.reload()
        // try{
        //     const response = await axios.post(`${BASE_URL}/api/employee`,{data:userProfile})
        // console.log(response.data)
        // }
        // catch(error){
        //     console.log(error,'Error while Saving User')
        // }
    }


    const ShowPass = () => {

        if(show){
            setshow(false)
        }else{
            setshow(true)
        }
       
    }
    return (
        <>
        <div className="lContainer">
     
            <div className="login-conatiner">
         
                <div className="image">


                </div>

              
                <div className="login">
                        <h1>Login</h1>

                    <div className="form-group">
                        <label>Username:</label>
                        <input className="username" type="text" value={userProfile.username}
                          onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="password" type=  {show ? "text":"password"} value={userProfile.password}
                          onChange={(e) => setUserProfile({...userProfile, password: e.target.value})}/>
                   
                    </div>

                    <div className="form-group-Pass">
                        <input className="showpass" type="checkbox" style={{cursor:'pointer'}} onChange={ShowPass}/>
                        <label>Show Password:</label>
                    </div>
              
              
                    <div className="btn-container">
                        <button onClick={SaveUser}>Login</button>
                        <button onClick={SignupUser}>Sign Up</button>
                    
                    </div>
                </div>



            </div>

        </div>
        </>
    )

}

export default Login;

