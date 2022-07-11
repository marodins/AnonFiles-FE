import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Box,
    Paper,
    TextField,
    Button,
    CircularProgress,
    Icon
} from '@mui/material';
import {AttachFile, Check} from '@mui/icons-material';
import { useRef, useEffect, useState } from 'react';
import socket from '../models/connection';
import {Message, messageFromList, messageFromObject} from '../models/message';


export const ChatMessages = ({roomId})=>{
    const scroll = useRef(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [gettingMessages, setMessageGet] = useState(true);
    const [selectedFiles, setFile] = useState([]);
    const initRender = useRef(true);


    useEffect(
        ()=>{
            socket.socket.on('all_messages', (res)=>{
                const m = messageFromList(res);
                setMessages(m);
            });
            socket.socket.on('new_message', ({data})=>{
                var m = messageFromObject(data);
                setMessages((prev)=>[...prev,m]);
            });
            socket.socket.emit('get_all_messages', {"room":roomId});
            return ()=>{
                console.log('removing message handlers')
                socket.socket.off('all_messages');
                socket.socket.off('new_message');
            }
        },[socket.socket]
    );
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
        if(messageInput == '' && selectedFiles.length == 0){
            return
        }
        const message = new Message(socket.user.name,socket.user.user_id, messageInput);
        if(messageInput !== ''){
            socket.socket.emit('send_message', {"room":roomId, "message":messageInput, "token":socket.user.token});
        }
        if (selectedFiles.length > 0){
            console.log('emitting files now')
            const allFiles = Array.from(selectedFiles).map((file, index)=>{
                return {
                    name:file.name,
                    type:file.type,
                    data:file
                }
            })
            socket.socket.emit('send_file', {"files":allFiles, "room":roomId});            
        }

        setMessages((prev)=>[...prev,message]);
        setMessageInput(''); 

        
    }
    const enter_pressed  = (e)=>{
        if(e.key == "Enter"){
            return send_message();
        }
    }

    const attachFile = (e)=>{
        setFile(e.target.files);
    }
    
    return (
        <Grid container direction='column' alignContent={'right'} alignItems={'right'} spacing={2} xs={5}>
            <Grid item>
                <Paper style={{overflow:'auto', height:500, width:600}}>
                                 {gettingMessages?
                                <CircularProgress/>:<List>
                                { messages==0?<Box></Box>:
                                    messages.map((m, index)=>{
                                        var justification = m.user_id === socket.user.user_id? 'right' : 'left';
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
            <Grid item xs={8}>

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
                <Button component='label'><AttachFile/><input type='file' multiple='multiple' onChange={attachFile} hidden/></Button>

            </Grid>
            <Grid item>
                {
                    Array.from(selectedFiles).map((item, index)=>{
                        return(
                            <Box><Check/> {item.name}</Box>
                        )
                    })
                }
            </Grid>

        </Grid>
        
        
        
    )
}