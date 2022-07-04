import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Box,
    Paper,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import socket from '../models/connection';
import {Message, messageFromList, messageFromObject} from '../models/message';


export const ChatMessages = ({roomId})=>{
    const scroll = useRef(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [gettingMessages, setMessageGet] = useState(true);
    const initRender = useRef(true);


    useEffect(
        ()=>{
            socket.socket.on('all_messages', (res)=>{
                var m = messageFromList(res);
                setMessages(m);
            })
            socket.socket.on('new_message', ({data})=>{
                var m = messageFromObject(data);
                setMessages((prevMessages)=>[...prevMessages,m]);
            })
            socket.socket.emit('get_all_messages', {"room":roomId});
        },[socket.socket]
    )
    useEffect(
        ()=>{
            if(scroll.current){
                console.log('current now');
                scroll.current.scrollIntoView();
            }
        }, [gettingMessages, messages]
    );

    useEffect(()=>{
        if(!initRender.current){
            setMessageGet(false);
        }else{
            initRender.current = false
        }
        
    },[messages]);

    const send_message = ()=>{
        console.log('will emit soon', roomId)
        const message = new Message(socket.user.name,socket.user.user_id, messageInput);
        socket.socket.emit('send_message', {"room":roomId, "message":messageInput, "token":socket.user.token});
        setMessages([...messages, message]);
        setMessageInput('');
        
    }
    const enter_pressed  = (e)=>{
        if(e.key == "Enter"){
            return send_message();
        }
    }
    
    return (
        <Grid container direction='column' alignContent={'left'} alignItems={'left'} spacing={3} xs={4}>
            <Grid item xs={1}>
               
                <Paper style={{overflow:'auto', height:500, width:500}}>
                                 {gettingMessages?
                                <CircularProgress/>:<List>
                                { messages==0?<Box></Box>:
                                    messages.map((m, index)=>{
                                        var justification = m.user_id == socket.user.user_id? 'right' : 'left';
                                        return (
                                            
                                                <ListItem key={index} ref={scroll}>
                                                    <Grid container direction={'row'} justifyContent={justification}>
                                                        <Grid item>
                                                            <ListItemText>
                                                                {m.message}
                                                            </ListItemText>
                                                            <ListItemText>
                                                                {`${m.time}   ${m.user}`}
                                                            </ListItemText>

                                                        </Grid>
                                                   </Grid>  
                                                </ListItem>                            
                                           

                                        );
                                    })
                                }
                            </List>}
                    </Paper>
            </Grid>
            <Grid item xs={2}>

                            <TextField
                                id = "message-input"
                                label = "message-input"
                                onChange= {(e)=>{
                                    setMessageInput(e.target.value);
                                }}
                                onKeyDown = {enter_pressed}
                                value={messageInput}
                                fullWidth>
            
                            </TextField>
                        <Button onClick={send_message}>Send</Button>
            </Grid>   
        </Grid>
        
        
        
    )
}