import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import socket from '../models/connection'
import {Message, messageFromList, messageFromObject} from '../models/message';
import UserDash from "../components/user_dash";
import { ChatMessages } from "../components/chat";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";
import { not_connected } from "../messages/errors";
import user from '../models/user';

export const Room = ()=>{
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [gettingMessages, setMessageGet] = useState(true);
    const initRender = useRef(true);
    const [error, setError] = useState(0);
    const {state} = useLocation();
    const roomId = state.roomId;

    useEffect(()=>{
        if(!initRender.current){
            setMessageGet(false);
        }else{
            initRender.current = false
        }
        
    },[messages]);

    useEffect(()=>{
        if(socket.socket && socket.socket.connected){
            socket.socket.on('all_messages', (res)=>{
                console.log(`received ${res}`);
                var m = messageFromList(res);
                setMessages(m);
            })
            socket.socket.on('new_message', ({data})=>{
                var m = messageFromObject(data);
                setMessages((prevMessages)=>[...prevMessages,m]);
            })           
        }else{
            setError('connection');
        }
        socket.socket.emit('get_all_messages', {"room":roomId});
        console.log('getting messages');

    }, [socket.socket]);


    const handle_errors = ()=>{
        if(error === 'connection'){
            return not_connected();
        }
    }
    const send_message = ()=>{
        console.log('will emit soon', roomId)
        const message = new Message(socket.socket.id, messageInput);
        messages.push(message);
        socket.socket.emit('send_message', {"room":roomId, "message":messageInput, "token":user.token});
        setMessages(messages);
        setMessageInput('');
        
    }
    const enter_pressed  = (e)=>{
        if(e.key == "Enter"){
            return send_message();
        }
    }

    return (
        <div>
            {error!==0 || !socket.socket?handle_errors():
                    <Grid>
                    <Grid item>
                        <UserDash room = {roomId}/>
                        {gettingMessages?<CircularProgress/>:<ChatMessages messages={messages}/> }               
                    </Grid>
        
                    <Grid item>
                        <TextField
                            id = "message-input"
                            label = "message-input"
                            onChange= {(e)=>{
                                setMessageInput(e.target.value);
                            }}
                            onKeyDown = {enter_pressed}
                            value={messageInput}>
        
                        </TextField>
                        <Button onClick={send_message}>Send</Button>
                    </Grid>
                </Grid>
            }
        </div>

    );



}