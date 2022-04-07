import React, {useContext} from 'react'
import { Routes ,Route } from 'react-router-dom';
import Join from './component/join/Join'; 
import Chat from './component/chat/Chat.js'



function Pages() {
    
   

    return (
        <Routes>
            
            
            <Route path="/" element={<Join/>} />
            <Route path="/chat" element={<Chat/>} />

        
            
        </Routes>    
            
       
    )
}

export default Pages
