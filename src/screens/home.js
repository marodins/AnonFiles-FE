
import {Button, Grid, TextField, Divider, Container, CircularProgress} from '@mui/material';
import {TextFieldHome} from '../components/room_input';
import {useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import socket from '../models/connection';
import LoginButton from '../components/login';
import { Link } from 'react-router-dom';

export var Home =({cookies})=>{
    const [makeRoom, setMakeRoom] = useState(false);

    let navigate = useNavigate();
    
    useEffect(()=>{
        if(socket.socket){
            socket.socket.on('joined', ({room})=>{
                navigate('/room', {state:{roomId:room}});
            });
        }else{
            console.log('no socket');
        }
        return ()=>{
            socket.socket.off('joined');
        }

    },[socket.socket]);
    
    const submitButtonHandler = ()=>{
        
        if(socket.socket && socket.socket.connected){
            setMakeRoom(true);
            socket.socket.emit("make_room", ()=>{
                navigate('/rooms'); 
            });
                    
        }else{
            console.log('socket not connected');
        }
    }
    return (
        <Container>
            <Grid
            container
            columns={{xs:2, md:2}}
            direction='column'
            alignItems='center'
            justifyContent='center'
            >
                <Grid container align='right' xs={5}>
                         <Grid item xs>
                            {cookies && cookies.token?null:<LoginButton/>}
                        </Grid>                   
                </Grid>
                <Grid container columns={{xs:3, md:10}} direction='column' rowSpacing={2} alignItems='center'>

                    <Grid item xs>
                        <Button variant="contained" onClick={submitButtonHandler} sx={{height:'40px', width:'150px'}}>
                            {makeRoom ? <CircularProgress size={15} sx={{color:'white'}}/>: 'Make Room'}
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" onClick={()=>navigate('/rooms')} sx={{height:'40px', width:'150px'}}>Your Rooms</Button>
                        <Grid item xs>
                            <Divider>or</Divider>
                        </Grid>
                    </Grid>
                   
                </Grid>

                
                <TextFieldHome socket={socket}/>
      

            </Grid>
        </Container>

    );
}