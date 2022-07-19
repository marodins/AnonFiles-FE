import {useEffect, useState} from 'react';
import {} from 'react-router-dom';
import {TextField, Grid, Button} from '@mui/material';
import SocketConnect from '../models/connection';


export var TextFieldHome = ({socket})=>{
    const [room_name, setName] = useState(0);
    const [room_pass, setPass] = useState(0);

    const submitButtonHandler = ()=>{
        if(room_name !== 0 && room_pass !== 0){
            socket.socket.emit("try_room", {"name":room_name, "pass":room_pass});
        }

    }
    return (
        <Grid container spacing={{md:2}} justifyContent='center' direction='column' alignItems='center'>
            <Grid item xs={3}>
                <TextField 
                    id="room-name" 
                    label='room-name' 
                    variant='outlined'
                    onChange={(e)=>{setName(e.target.value)}} 
                    required >
                    Room Name
                </TextField>
            </Grid>
            <Grid item xs={3}> 
                <TextField 
                    id="room-pass" 
                    label='room-pass' 
                    variant='outlined'
                    onChange={(e)=>{setPass(e.target.value)}} 
                    required >
                    Room Pass
                </TextField>

            </Grid>
           
            <Grid item xs={1} align='right'>
                    <Button variant="contained" onClick={submitButtonHandler}> Submit </Button>  
            </Grid>
        </Grid>


    );

}
