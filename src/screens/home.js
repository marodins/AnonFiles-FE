
import {Button, Grid, TextField, Divider, Container, CircularProgress} from '@mui/material';
import {TextFieldHome} from '../components/room_input';
import {useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../models/connection';
import LoginButton from '../components/login';
import { Link } from 'react-router-dom';

export var Home =({cookies})=>{

    let navigate = useNavigate();
    
    useEffect(()=>{
        console.log(cookies)
        if(socket.socket){
            console.log("connected", socket.socket.connected)
            socket.socket.on('joined', ({room})=>{
                console.log('received trigger on join');
                navigate('/room', {state:{roomId:room}});
            });
        }else{
            console.log('no socket');
        }

    },[socket.socket]);
    
    const submitButtonHandler = ()=>{
        if(socket.socket.connected){
            
            socket.socket.emit("make_room");
            navigate('/rooms');         
        }else{
            console.log('socket not connected');
        }
    }
    return (
        <Container>
            <Grid
            container spacing={2}
            rowSpacing={2}
            columnSpacing={{xs:3, md:2}}
            direction='column'
            alignItems='center'
            justifyContent='center'
            >
                <Grid item xs>
                    <Grid>
                        <Button variant="contained" onClick={submitButtonHandler}>
                            Make Room
                        </Button>
                        <Button variant="contained" onClick={()=>navigate('/rooms')}>Rooms</Button>
                    </Grid>
                    <Grid>

                    </Grid>
                    {cookies && cookies.token_id?null:<LoginButton/>}
                </Grid>
                <Grid item xs>
                <Divider>or</Divider> 
                </Grid>
                
                <TextFieldHome socket={socket}/>
      

            </Grid>
        </Container>

    );
}