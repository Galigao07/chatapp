import React, { useEffect, useState } from "react";
import './css/Signup.css'
import axios from "axios";
import { Url } from "../config";
import { AlertModal } from "../Alert";


const BASE_URL = Url();
interface UserData{
    firstname:string,
    middlename:string,
    lastname:string,
    bdate:Date,
    email:string,
    username:string,
    password:string,

}
const Signup: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData>({ 
        firstname: '', 
        middlename: '', 
        lastname: '', 
        bdate: new Date(), 
        email: '', 
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

        if (!userProfile.firstname || !userProfile.lastname || !userProfile.email || !userProfile.password) {
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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userProfile.email)) {
            // Display error message or handle the error as needed
            // console.error('Invalid email format');
            const modal = AlertModal('Invalid email format')
            document.body.appendChild(modal);

            setTimeout(() => {
                document.body.removeChild(modal);
            }, 2000); // 5000 milliseconds = 5 seconds
            return;
        }

        try{

            

            const response = await axios.post(`${BASE_URL}/api/signup/`,{data:userProfile})
             console.log(response.data)
             setUserProfile({ 
                firstname: '', 
                middlename: '', 
                lastname: '', 
                bdate: new Date(), 
                email: '', 
                username: '',  // This property seems to be incorrect, consider removing it
                password: ''
            })
        }
        catch(error:any){
            const modal = AlertModal(error.response.data.message)
            document.body.appendChild(modal);

            setTimeout(() => {
                document.body.removeChild(modal);
            }, 2000); // 5000 milliseconds = 5 seconds
        }
    }
    const CancelUser = async() => {
        localStorage.removeItem('IsSignup')
        window.location.reload();
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
        <div className="Container">
     
            <div className="signup-conatiner">
         
                <div className="image">


                </div>

              
                <div className="signup">
                        <h1>Sign Up</h1>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input className="Fname" type="text" value={userProfile.firstname}
                        onChange={(e) => setUserProfile({...userProfile, firstname: e.target.value})}
                        />

                    </div>
                    <div className="form-group">
                        <label>Middle Name:</label>
                        <input className="Mname" type="text" value={userProfile.middlename}
                        onChange={(e) => setUserProfile({...userProfile, middlename: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input className="Lname" type="text" value={userProfile.lastname}
                        onChange={(e) => setUserProfile({...userProfile, lastname: e.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Birth Date:</label>
                        <input className="Bdate" type="date"   value={formatDate(userProfile.bdate)}  
                          onChange={(e) => setUserProfile({...userProfile, bdate:  new Date(e.target.value)})}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="email" type="email" placeholder="example@gmail.com" value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}/>
                    </div>

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
                        <button onClick={SaveUser}>Save</button>
                        <button onClick={CancelUser}>Cancel</button>
                    
                    </div>
                </div>



            </div>

        </div>
        </>
    )

}

export default Signup;

