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
            const new_message  = ({data})=>{
                var m = messageFromObject(data);
                setMessages((prev)=>[...prev,m]);
            }

            socket.socket.on('new_message', new_message);

            socket.socket.emit('get_all_messages', {"room":roomId}, (res)=>{
                const m = messageFromList(res);
                setMessages(m);
            });
            return ()=>{
                socket.socket.off('new_message', new_message);
            }
        },[socket.socket]
    );
    useEffect(
        ()=>{
            if(scroll.current){
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
        if(messageInput == '' && selectedFiles.length == 0){
            return
        }
        const message = new Message(socket.user.name,socket.user.user_id, messageInput);
        const file_messages = [];

        if (selectedFiles.length > 0){
            const allFiles = Array.from(selectedFiles).map((file, index)=>{
                file_messages.push(`\n${index+1}.${file.name}`)
                return {
                    name:file.name,
                    type:file.type,
                    data:file
                }
            });
            socket.socket.emit('send_file', {"files":allFiles, "room":roomId}, ()=>{
                setFile([]);
            });
            // include file names sent and message sent

            message.addFileNames(file_messages);

        }
        socket.socket.emit('send_message', {"room":roomId, "message":message.message, "token":socket.user.token});
        setMessages((prev)=>[...prev, message]);
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
        <Grid container direction='column' justifyContent={'center'} alignItems={'center'} spacing={2}>
            <Grid item>
                <Paper style={{overflow:'auto', height:500, width:600, backgroundColor:'beige'}}>
                                 {gettingMessages?
                                <CircularProgress/>:<List>
                                { messages==0?<Box></Box>:
                                    messages.map((m, index)=>{
                                        if(!m) return null;
                                        var justification = m.user_id === socket.user.user_id? 'right' : 'left';
                                        return (
                                            
                                                <ListItem key={index} ref={scroll}>
                                                    <Grid container direction={'row'} justifyContent={justification}>
                                                        <Grid item sx={{maxWidth:'40%'}}>
                                                            {m.message.split('\n').map((m)=>{
                                                               return(<ListItemText>
                                                                    <strong>{m}</strong>
                                                                </ListItemText>)
                                                            })}
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
            <Grid item>

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