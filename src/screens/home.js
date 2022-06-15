
import {Button, Grid, TextField, Divider, Container, CircularProgress} from '@mui/material';
import {TextFieldHome} from '../components/room_input';
import {useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../models/connection';
import LoginButton from '../components/login';

export var Home =()=>{

    let navigate = useNavigate();

    useEffect(()=>{
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
                    <Button variant="contained" onClick={submitButtonHandler}>
                        Make Room
                    </Button>
                    <LoginButton/>
                </Grid>
                <Grid item xs>
                <Divider>or</Divider> 
                </Grid>
                
                <TextFieldHome socket={socket}/>
      

            </Grid>
        </Container>

    );
}