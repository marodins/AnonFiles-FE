import {
    Grid,
    Button
} from '@mui/material';
import axios from '../network/axios_instance';
import { useEffect } from 'react';
import socket from '../models/connection';

const LoginButton = ()=>{
    const handleLogin = ()=>{
        if(socket.socket && socket.socket.connected){
            socket.socket.disconnect();
        }
        axios.get('authorize');
    }
    return (
        <Grid>
            <Button onClick={handleLogin}>
                Login
            </Button>
        </Grid>

    )
}

export default LoginButton;