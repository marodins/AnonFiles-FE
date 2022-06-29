import {
    Grid,
    Button,
    TextField, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemButton,
    CircularProgress,
    Box
} from '@mui/material';
import { useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import sock from '../models/connection';
import user from '../models/user';

export var Rooms = () => {
    const [rooms, setRooms] = useState(0);
    const [selectedId, setSelected] = useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        if(sock.socket && sock.socket.connected){
            sock.socket.on('all_rooms',(rooms)=>{
                setRooms(rooms);
            })
            sock.socket.emit('get_rooms');
        }

    }, [sock.socket])

    const handle_select = (val)=>{
        navigate('/room', {state:{roomId:val}});
    }

    return (
        <Grid>
            {rooms === 0? 
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>:
                        <List>
            
                        {rooms.map((val, index)=>{
                            if(val!=sock.socket.id){
                                return (
                                    <ListItem alignItems='flex-start' key={val}>
                                        <ListItemButton
                                            selected={selectedId===val}
                                            onClick={(e)=>{
                                                setSelected(val);
                                                handle_select(val);
                                            }}
                                        >
                                            <ListItemText primary={val}/>
                
                                        </ListItemButton>
                                    </ListItem>
                                );
                            }

            
                        })}
                        </List>
            }

        </Grid>
    )
}