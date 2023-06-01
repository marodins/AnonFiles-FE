import {
    Grid,
    Button
} from '@mui/material';

import { useEffect } from 'react';
import socket from '../models/connection';
import c from '../config';

const LoginButton = ()=>{
    const handleLogin = ()=>{
        if(socket.socket && socket.socket.connected){
            socket.socket.disconnect();
        }
        window.location.href = `${c.auth_url}`;
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