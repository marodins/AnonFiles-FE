
import {
    Grid,
    Paper,
    Typography,
    CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';
import socket from '../models/connection';

export const Info = ({roomId})=>{
    const [room_info, setInfo] = useState({});

    useEffect(()=>{
        socket.socket.on('room_info', ({room})=>{
            setInfo(room);
        })
        socket.socket.emit('get_room_info', {roomId:roomId});
        return ()=>{
            socket.socket.off('room_info');
        }
    }, [setInfo]);

    return(
        <Grid container direction='column' justifyContent={'left'} alignContent={'left'} md={10}>
            
            <Paper elevation={6}>
                {Object.keys(room_info).length > 0?
                    <Grid item>
                        <Grid item md={10}>
                            <Typography variant='h8'>
                                Room Admin: {room_info.admin[1]}
                            </Typography>
                        </Grid>
                        <Grid item md={10}>
                            <Typography variant='h8'>
                                Room Name: {roomId}
                            </Typography>                     
                        </Grid>
                        <Grid item md={11}>
                            <Typography variant='h8'>
                                Room Password: {room_info.pass}
                            </Typography>                       
                        </Grid>
                    </Grid>
                     : <CircularProgress/>}
            </Paper>              

        </Grid>
    )
}