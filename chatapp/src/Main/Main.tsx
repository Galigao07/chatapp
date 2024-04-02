import React, { useEffect, useState } from "react";
import './css/Main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog, faPaperPlane, faPaperclip, faPlaneArrival, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { Link } from "react-router-dom";
import { isDesktop, isMobile,isTablet } from 'react-device-detect';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Url } from "../config";
import { Typography } from '@mui/material';
const Main:React.FC = () => {
  const BASE_URL = Url();
    
    const [sms,setsms] = useState<string>('')
    const [receivedData, setReceivedData] = useState<any>([]);
    const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
    const [deviceType, setDeviceType] = useState<string>('');
    const [Freinds,setFreinds] = useState<any>([])
    const [UserID,setUserID]=useState<any>(0)
    const [userID_A,setuserID_A]=useState<any>(0)
    const [userID_B,setuserID_B]=useState<any>(0)
    const [receiverChatSocket, setreceiverChatSocket] = useState<WebSocket | null>(null);
    const [senderChatSocket, setsenderChatSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
      const checkDeviceType = () => {
        if (window.innerWidth <= 768) { // Adjust the threshold as needed
          setDeviceType('Mobile');
        }  else {
          setDeviceType('Desktop');
        }
      };
    
      checkDeviceType();
    
      const handleResize = () => {
        checkDeviceType();
      };
    
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/signup/`);
          console.log(response.data.data);
          setFreinds(response.data.data)
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, []);

    const ClickGroup = (index: any) => {
      const data = Freinds[index];
      // Close any existing WebSocket connections
      // if (receiverChatSocket) {
      //   receiverChatSocket.close();
      // }
      // if (senderChatSocket) {
      //   senderChatSocket.close();
      // }
      console.log(data.id)
      setuserID_B(data.id);
    };
    

    useEffect(()=>{
      setuserID_A(localStorage.getItem('UserID'))
    },[])

    useEffect(() => {
      // Establish WebSocket connection for user A (receiver)
      const receiverChatSocket1 = new WebSocket(`ws://localhost:8001/ws/chat/${userID_A}/`);
      console.log(userID_A)
      setreceiverChatSocket(receiverChatSocket1);
    
      receiverChatSocket1.onopen = () => {
        console.log('Receiver WebSocket connection established.');
      };
    
      receiverChatSocket1.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('receiverChatSocket1 data:', data);
        // Assuming you want to display all messages received
        setReceivedData((prevData: any) => [...prevData, data.message]);
      };
    
      receiverChatSocket1.onerror = (error) => {
        console.error('Receiver WebSocket error:', error);
      };
    
      // Close the WebSocket connection for user A when component unmounts or when userID_A changes
      return () => {
        if (receiverChatSocket1.readyState === WebSocket.OPEN) {
          receiverChatSocket1.close();
        }
      };
    },[userID_A]); // Include userID_A as a dependency
    
    useEffect(() => {
      // Establish WebSocket connection for user B (sender)
      const senderChatSocket2 = new WebSocket(`ws://localhost:8001/ws/chat/${userID_B}/`);
      setsenderChatSocket(senderChatSocket2);
    
      senderChatSocket2.onopen = () => {
        console.log('Sender WebSocket connection established.');
      };

      senderChatSocket2.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('senderChatSocket2 data:', data);
        // Assuming you want to display all messages received
        setReceivedData((prevData: any) => [...prevData, data.message]);
      }
    
      senderChatSocket2.onerror = (error) => {
        console.error('Sender WebSocket error:', error);
      };
    
      // Close the WebSocket connection for user B when component unmounts or when userID_B changes
      return () => {
        if (senderChatSocket2.readyState === WebSocket.OPEN) {
          senderChatSocket2.close();
        }
      };
    }, [userID_B]); // Include userID_B as a dependency
    
    const sendMessage = () => {
      if (sms.trim() !== '') {
        console.log('Sending message:', sms);
        const message = {
          'message': sms,
          'recipient_user_id'  : userID_B, 
        };
        if (senderChatSocket && senderChatSocket.readyState === WebSocket.OPEN) {
          senderChatSocket.send(JSON.stringify(message));
          setsms('');
        } else {
          console.error('WebSocket connection is not open.');
        }
      }
    };



    // const ClickGroup = (index: any) => {
    //   const data = Freinds[index];
    //   // if (chatSocket) {
    //   //   chatSocket.close(); // Close any existing WebSocket connection
    //   // }

    //   if (receiverChatSocket) {
    //     receiverChatSocket.close();
    //   }
    //   if (senderChatSocket) {
    //     senderChatSocket.close();
    //   }
    //   setuserID_B(data.id);
    // };


    //*************************** WEBSOCKET *****************************
    // useEffect(() => {
    //   const chatSocket1 = new WebSocket(`ws://localhost:8001/ws/chat/${UserID}/`);
    //   setChatSocket(chatSocket1); // Set chatSocket state
    //   chatSocket1.onopen = () => {
    //     console.log('WebSocket connection established.');
    //   };
    
    //   chatSocket1.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     console.log('Received data:', data);
    //     // if (parseInt(data.user_id) === UserID) {
    //       // Display the message in the chat UI
    //       setReceivedData((prevData: any) => [...prevData, data.message]);
    //     // }
    //   };
    
    //   chatSocket1.onerror = (error) => {
    //     console.error('WebSocket error:', error);
    //   };
    
    //   // Close the WebSocket connection when component unmounts
    //   return () => {
    //     if (chatSocket1 && chatSocket1.readyState === WebSocket.OPEN) {
    //       chatSocket1.close();
    //     }
    //   };
    // }, [UserID]); // Include UserID as a dependency


    // useEffect(() => {
    //   // Close any existing WebSocket connections

    
    //   // Establish WebSocket connection for user A (receiver)
    //   const receiverChatSocket1 = new WebSocket(`ws://localhost:8001/ws/chat/${userID_A}/`);
    //   setreceiverChatSocket(receiverChatSocket1)
    //   receiverChatSocket1.onopen = () => {
    //     console.log('Receiver WebSocket connection established.');
    //   };
    
    //   receiverChatSocket1.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     console.log('Received data:', data);
    //     // Display the message in the chat UI
    //     setReceivedData((prevData: any) => [...prevData, data.message]);
    //   };
    
    //   receiverChatSocket1.onerror = (error) => {
    //     console.error('Receiver WebSocket error:', error);
    //   };
    
    //   // Establish WebSocket connection for user B (sender)
    //   const senderChatSocket2 = new WebSocket(`ws://localhost:8001/ws/chat/${userID_B}/`);
    //   setsenderChatSocket(senderChatSocket2)
    //   senderChatSocket2.onopen = () => {
    //     console.log('Sender WebSocket connection established.');
    //   };
    
    //   senderChatSocket2.onerror = (error) => {
    //     console.error('Sender WebSocket error:', error);
    //   };
    
    //   // Close the WebSocket connections when component unmounts or when user IDs change
    //   return () => {
    //     if (receiverChatSocket1.readyState === WebSocket.OPEN) {
    //       receiverChatSocket1.close();
    //     }
    //     if (senderChatSocket2.readyState === WebSocket.OPEN) {
    //       senderChatSocket2.close();
    //     }
    //   };
    // }, [userID_A, userID_B]); // Include userID_A and userID_B as dependencies

    //   const sendMessage = () => {
        
    //     if (sms.trim() !== '') {
    //       console.log('Sending message:', sms);
    //       const message = {
    //         'message': sms
    //       };
    //       if (senderChatSocket && senderChatSocket.readyState === WebSocket.OPEN) { // Check if chatSocket is defined and ready
    //         senderChatSocket.send(JSON.stringify(message));
    //         setsms('');
    //       } else {
    //         console.error('WebSocket connection is not open.');
    //       }
    //     }
    //   };


      const handleLogout = () => {
        localStorage.removeItem('IsLogin');
        // Additional logout logic if needed
        window.location.reload();
    };
    
    return (
      
            <div className="Main-container">

                <div className="sidebar-container">

                        <div>
                        <input className="Search" placeholder="Search" style={{display: deviceType === 'Desktop' ? 'block' : 'none'}}/>
                        </div>
                   
                    {Freinds.map((items:any,index:any) => (
                    <div className="friends-container" key={index} onClick={() => ClickGroup(index)}>
                        <Typography sx={{fontSize:{
                                    xs: '0.3rem', // Default font size for extra-small screens
                                    sm: '0.4rem', // Font size for small screens
                                    md: '0.5rem', // Font size for medium screens
                                    lg: '0.6rem', // Font size for large screens
                                    xl: '.7rem', // Font size for extra-large screens
                        },cursor:'pointer',padding:'2px'}}>{items.lastname}, {items.firstname} {items.middlename}</Typography>
                    </div>
                    ))}


                    <div className="Profile" style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                        <Link to="">
                          <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                          <label style={{display: deviceType === 'Desktop' ? 'block' : 'none'}}>Profile</label> 
                        </Link>
                        

                        <Link to=""> 
                          <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                          <label style={{display: deviceType === 'Desktop' ? 'block' : 'none'}}> Settings</label> 
                        </Link>

                        <Link to="" onClick={handleLogout}> 
                          <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
                          <label style={{display: deviceType === 'Desktop' ? 'block' : 'none'}}> Logout</label> 
                        </Link>
                          <p style={{color:'blue'}}>{localStorage.getItem('UserFullname')}</p>
                    </div>
                </div>

                <div className="sub-container">
                <div className="receive">
              
                        {/* Map over messages array to generate rows */}
                        {receivedData.map((item:any, index:any) => (
                          <div key={index}>

                                <label style={{color:'black'}} className="receive">{item}</label>
                          </div>
                           
                        ))}

                </div>
                <div className="sender">
                    <input className="Send" value={sms} onChange={(e) => setsms(e.target.value)} placeholder="Message"/>
                    <FontAwesomeIcon className ="icon" icon={faPaperPlane} onClick={sendMessage}></FontAwesomeIcon>
                </div>
             
                
                
                </div>

            </div>

          
    )
}

export default Main;