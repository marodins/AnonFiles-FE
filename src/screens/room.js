import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import socket from '../models/connection'
import {Message, messageFromList, messageFromObject} from '../models/message';
import UserDash from "../components/user_dash";
import { ChatMessages } from "../components/chat";
import {Grid } from "@mui/material";
import { not_connected } from "../messages/errors";
import user from '../models/user';

export const Room = ()=>{
    const [error, setError] = useState(0);

    
    const {state} = useLocation();
    const roomId = state.roomId;



    useEffect(()=>{
        if(socket.socket && socket.socket.connected){
         
        }else{
            setError('connection');
        }
        
        console.log('getting messages');

    }, [socket.socket]);



    const handle_errors = ()=>{
        if(error === 'connection'){
            return not_connected();
        }
    }


    return (
        <div>
            {error!==0 || !socket.socket?handle_errors():
                <Grid container alignContent='center' alignItems='left'>
                        <UserDash room = {roomId}/>
                        <ChatMessages
                            roomId={roomId}
                            />

                </Grid>
            }
        </div>

    );



}