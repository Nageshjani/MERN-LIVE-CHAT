import React,{useEffect,useState} from 'react'
import { user } from '../join/Join'
import socketIo from "socket.io-client";
import closeIcon from "../../images/closeIcon.png";
import ReactScrollToBottom from "react-scroll-to-bottom";
import sendLogo from "../../images/send.png";
import './chat.css'


import Message from '../message/Message'

const ENDPOINT = "https://live-chat-nagesh.herokuapp.com";

let socket
const Chat = () => {
  const [id, setid] = useState("");
  const [details,setDetails]=useState([])


  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });

    document.getElementById('chatInput').value = "";
}
  

  useEffect(()=>{
    
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('Connected');
      setid(socket.id);
     
    })

    socket.emit('joined',user)


    socket.on('welcome', (data)=>{
      setDetails((prevChat)=>prevChat.concat([data]))
    })



    socket.on('userJoined',(data)=>{
      setDetails((prevChat)=>prevChat.concat([data]))
    })

    socket.on('leave', (data) => {
      setDetails((prevChat)=>prevChat.concat([data]))
    })
    socket.on('sendMessage', (data) => {
      setDetails((prevChat)=>prevChat.concat([data]))
  })

    

  },[])
  

  

 
  
  return ( 
                <div className="chatPage">
                  <div className="chatContainer">
                      <div className="header">
                          <h2>NAGESH CHAT</h2>
                          <a href="/" > <img src={closeIcon} alt="Close" /></a>
                      </div>
                      <ReactScrollToBottom className="chatBox">
                          {details.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                      </ReactScrollToBottom>
                      <div className="inputBox">
                          <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                          <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                      </div>
                  </div>

            </div>
  )


 


 
   

}

export default Chat
