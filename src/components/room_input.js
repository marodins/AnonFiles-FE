import {useEffect, useState} from 'react';
import {} from 'react-router-dom';
import {TextField, Grid, Button} from '@mui/material';
import SocketConnect from '../models/connection';


export var TextFieldHome = ({sock})=>{
    const [room_name, setName] = useState(0);
    const [room_pass, setPass] = useState(0);

    const SubmitButtonHandler = ()=>{
        sock.socket.emit("try_room", {"name":room_name, "pass":room_pass});
    }
    return (
        <Grid>
            <TextField 
                id="room-name" 
                label='room-name' 
                variant='outlined'
                onChange={(e)=>{setName(e.target.value)}} 
                required >
                Room Name
            </TextField> 
            <TextField 
                    id="room-pass" 
                    label='room-pass' 
                    variant='outlined'
                    onChange={(e)=>{setPass(e.target.value)}} 
                    required >
                    Room Pass
            </TextField>
            <Grid item xs>
                    <Button variant="contained" onClick={SubmitButtonHandler}> Submit </Button>  
            </Grid>
        </Grid>


    );

}