
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
        <Grid container direction='column' justifyContent={'left'} alignContent={'left'} sx={{minWidth:20}}>
            
            <Paper elevation={6} sx={{padding:2, minWidth:80}}>

                {Object.keys(room_info).length > 0?
                    <Grid item>
                        <Grid item>
                            <Typography variant='h8'>
                                Room Admin: <strong>{room_info.admin[1]}</strong>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h8'>
                                Room Name: <strong>{roomId}</strong>
                            </Typography>                     
                        </Grid>
                        <Grid item>
                            <Typography variant='h8'>
                                Room Password: <strong>{room_info.pass}</strong>
                            </Typography>                       
                        </Grid>
                    </Grid>
                     : <CircularProgress/>}
            </Paper>              

        </Grid>
    )
}